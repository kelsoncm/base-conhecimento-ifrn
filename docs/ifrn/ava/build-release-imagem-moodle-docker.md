---
title: "Build e release das imagens Docker do AVA Moodle"
category: "AVA"
service: "AVA Moodle"
audience: ["TIC", "Desenvolvedores", "DevOps"]
tags: ["ava", "moodle", "docker", "github-actions", "helm", "kubernetes", "release", "plugins", "pre-commit"]
reliability: "prático"
last_review: "2026-10-08"
source: "Documentação do monorepo de imagens Docker do AVA Moodle e experiências trocadas entre colaboradores"
---

## Sintoma

É preciso gerar uma nova versão do Moodle do AVA (atualizar o Moodle, incluir ou atualizar um plugin, corrigir algo na imagem) e publicar em homologação ou produção, mas não está claro como funciona o versionamento, quais tags disparam o pipeline ou como diagnosticar falhas.

## Contexto

Um monorepo (`docker_moodle`) gerencia duas imagens Docker:

1. **Imagem base** (`avamoodlebase`, pasta `base/`): contém essencialmente o Moodle e o runtime.
2. **Imagem principal** (`avamoodle`, pasta `main/`): estende a base e instala os plugins (arquivos `.zip`) existentes em `main/build/plugins/`.

O build e o deploy são automatizados com GitHub Actions e disparados pela criação de uma tag Git.

### Versionamento `M.m.r.s`

- `M`: versão major do Moodle;
- `m`: versão minor do Moodle;
- `r`: release do Moodle;
- `s`: sequencial interno da equipe.

Exemplo: `4.5.12.072` corresponde ao Moodle 4.5.12, build interno 72.

## Procedimento

### 1. Regras de tag (trava de segurança)

- **Produção**: tag puramente numérica `M.m.r.s` (ex.: `4.5.12.072`).
- **Teste/homologação**: o mesmo formato terminado em `-test` (ex.: `4.5.12.072-test`).
- Qualquer outro formato (`v1`, `wip`, `bugfix`) é bloqueado e não executa o build.

### 2. O que o pipeline faz

1. Valida o formato da tag.
2. Compara a pasta `base/` entre a tag atual e a anterior. Se mudou (ou na primeira release), constrói e publica a imagem base; senão, pula essa etapa.
3. Constrói a imagem principal: em produção, a imagem `avamoodle`; em teste, uma imagem de desenvolvimento (estágio `dev` do Dockerfile).
4. Faz o deploy: produção atualiza o servidor via Docker Compose por SSH; teste atualiza o ambiente de homologação no cluster Kubernetes via Helm Chart.
5. Após o deploy, o workflow aguarda cerca de 2 minutos e exibe os últimos logs do contêiner para conferir se o Moodle subiu.

Tempos aproximados: 5 a 10 minutos sem mudança na base e 15 a 25 minutos com mudança na base.

### 3. Como fazer um release

```bash
# 1. Defina a versão
export IMAGE_VERSION=4.5.12.072

# 2. Atualize a versão da imagem base no main/Dockerfile (se aplicável)
sed -i "s/MOODLE_IMAGE_VERSION=.*$/MOODLE_IMAGE_VERSION=${IMAGE_VERSION}/g" ./main/Dockerfile

# 3. Commit e push na branch principal
git add .
git commit -m "build: atualizar versao da imagem para ${IMAGE_VERSION}"
git push origin main

# 4a. Release de TESTE (Helm/Kubernetes)
git tag ${IMAGE_VERSION}-test
git push origin ${IMAGE_VERSION}-test

# 4b. Release de PRODUÇÃO (Docker Compose)
git tag ${IMAGE_VERSION}
git push origin ${IMAGE_VERSION}
```

Boa prática: publicar primeiro a tag `-test`, validar em homologação e só então criar a tag de produção.

### 4. Segredos e variáveis do pipeline

Configurados no GitHub (Settings, Secrets and variables, Actions), em nível de organização ou de repositório:

- credenciais de acesso ao registry de imagens (como segredos do registry) e o host do registry (variável);
- endereço do servidor de produção (acesso SSH) e do servidor de homologação (Helm/Kubernetes);
- checksums de instaladores usados no build (NVM e PHPUnit), para verificar integridade.

Os valores reais não devem ser documentados nem versionados.

### 5. Plugins incluídos

A imagem principal instala atualmente cerca de 170 plugins, a partir dos `.zip` em `main/build/plugins/`. Resumo por tipo:

| Tipo | Qtde aprox. | Exemplos |
|------|------------|----------|
| Atividades (`mod_`) | 23 | attendance, customcert, hvp, interactivevideo, learningmap, e os plugins ProITEC |
| Blocos (`block_`) | 23 | completion_progress, configurable_reports, xp, ranking, course_gallery, course_rating, site_info |
| Editor Tiny | 19 | c4l, codepro, widgethub, teamsmeeting |
| Disponibilidade (`availability_`) | 18 | cohort, role, xp, relativedate |
| Locais (`local_`) | 18 | suap, wordimport, openlms |
| Ferramentas admin (`tool_`) | 17 | certificate, objectfs, sentry, opcache |
| Campos de perfil (`profilefield_`) | 12 | cpf, brasilufmunicipio, orcid |
| Relatórios | 9 | coursesize, securityaudit, gradedist |
| Filtros / Atto / Inscrição / Formatos | 7 / 7 / 6 / 5 | enrol_suap, format_tiles |
| Temas | 2 | moove, suap |
| Autenticação | 1 | auth_suap |
| Diversos | 5 | pacote de idioma pt_br, qformat_wordtable |

Observações: alguns plugins aparecem em duas versões (`mod_learningmap`, `tool_objectfs`, `tool_opcache`, `report_coursesize`, `tiny_multilang2`), provavelmente por compatibilidade/migração. Os plugins com integração SUAP são `auth_suap`, `enrol_suap`, `local_suap` e `theme_suap`. Os plugins `local_iv*` formam o conjunto de anotação em vídeo interativo.

### 6. Desenvolvimento local e build manual

- Subir o ambiente do próprio monorepo: `docker compose up -d`; logs: `docker compose logs -f ava`; rebuild: `docker compose build && docker compose up -d`.
- Limpar volumes (apaga dados): remova a pasta `volumes/` e recrie `volumes/moodle/data` com permissão adequada.
- Build manual (sem CI): `docker build` em `base/` (se necessário) e em `main/` com o argumento `AVA_IMAGE_VERSION`, depois `docker push` no registry, previamente autenticado com `docker login`.

### 7. Pre-commit

O repositório usa `pre-commit` para validar YAML, lint de Dockerfile (`hadolint`), scripts shell (`shellcheck`), espaços em branco e presença de chaves privadas:

```bash
pip install pre-commit
pre-commit install
pre-commit run --all-files
```

### 8. Troubleshooting

- **Workflow não executou**: confirme que a tag foi enviada (`git ls-remote --tags origin`), que o formato é válido, que os segredos estão configurados e consulte a aba Actions.
- **Build falhou**: verifique o Dockerfile de `base/` (build da base) ou de `main/` (build principal) nos logs detalhados.
- **Deploy falhou**: teste a conectividade SSH com o servidor e confirme que o arquivo Compose de produção existe no caminho esperado.
- **Forçar rebuild da base sem mudanças**: faça uma alteração trivial em `base/` (por exemplo, um comentário em um arquivo de exemplo de configuração), faça commit e crie uma nova tag.

### 9. Ajuste pós-instalação citado na documentação

- Máscara de CPF no campo de perfil: injetar o script de máscara (jQuery Masked Input) em `additionalhtmlhead` e a chamada `jQuery("#profilefield_cpf").mask("999.999.999-99")` em `additionalhtmlfooter`.

## Quando escalar

- Falha de deploy que não se resolve com logs e conectividade SSH.
- Necessidade de nova credencial/segredo no pipeline.
- Incompatibilidade entre uma nova versão do Moodle e plugins instalados.

## Equipe responsável

Equipe de desenvolvimento do AVA (CTE/DEAD/ZL) e equipe de infraestrutura responsável pelos servidores de produção e homologação.

## Links oficiais

- [Docker: referência de build](https://docs.docker.com/build/)
- [GitHub Actions](https://docs.github.com/actions)
- [pre-commit](https://pre-commit.com)
- [Diretório de plugins do Moodle](https://moodle.org/plugins)

## Nível de confiabilidade

Prático.

## Notas adicionais

- O processo substituiu o antigo pipeline em GitLab CI e o script `release.sh`.
- Endereços de servidores, nomes de contas do registry e segredos foram omitidos de propósito.
- A contagem de plugins refere-se à documentação de março de 2026 e muda a cada release.
- Mudar a pasta `base/` encarece o build; planeje mudanças de Moodle e de plugins em releases separadas quando possível.
