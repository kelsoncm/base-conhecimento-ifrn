---
title: "Livro Interativo H5P com acesso por capítulo no Moodle"
category: "H5P"
service: "H5P / Moodle"
audience: ["TIC", "Desenvolvedores", "Professores"]
tags: ["h5p", "moodle", "livro-interativo", "postmessage", "availability-api", "plugin", "acessibilidade"]
reliability: "prático"
last_review: "2026-10-08"
source: "Documentação do repositório da biblioteca H5P.CustomizableInteractiveBook e do plugin Moodle local_h5pchapteraccess"
---

## Sintoma

Professores querem liberar capítulos de um Livro Interativo H5P conforme data, grupo, nota ou conclusão de outra atividade no Moodle, mas o Livro Interativo padrão mostra todos os capítulos sempre.

## Contexto

A solução tem **dois artefatos independentes**, que precisam ser instalados juntos:

- `H5P.CustomizableInteractiveBook`: variante do Livro Interativo que aplica uma política de acesso por capítulo recebida da plataforma (a versão 1.0.32 ou superior fala o contrato v1; a documentada é a 1.0.35). Independente de plataforma: não conhece cursos, notas, grupos nem classes do Moodle.
- `local_h5pchapteraccess`: plugin local do Moodle 4.5 que decide a disponibilidade, usando a Availability API, e envia ao iframe apenas a decisão final por capítulo. Não altera o núcleo do Moodle, o `mod_h5pactivity`, o `core_h5p` nem o tema.

A autoridade do acesso é o Moodle; o H5P só aplica a decisão.

Biblioteca relacionada: a configuração dos capítulos da biblioteca aceita `H5P.CustomizableColumn` como tipo de conteúdo. Não há, na documentação consultada, informação sobre as bibliotecas CustomCSS ou CodeHighlighter; este artigo não as descreve.

## Procedimento

### 1. Entender o modelo

**Manifesto.** Criado a partir de `config.chapters` antes da construção das instâncias filhas; imutável; contém `id`, `title`, `position` e `stable`. O `id` é o `subContentId` do capítulo, nunca a posição. Conteúdo legado sem `subContentId` recebe `legacy-position-N` e `stable: false` (executa, mas não aceita regra persistente). IDs duplicados interrompem a inicialização.

**AccessPolicy.** Normaliza a resposta externa em um mapa imutável com `contractVersion`, `required`, `teacherBypass` e, por ID, `available` e `message`. Capítulos omitidos ficam disponíveis. `allowAll(manifest)` é o fallback autônomo.

**AccessController.** API de domínio usada pela interface: disponibilidade, mensagem, quantidade, próximo/anterior disponível. Os componentes visuais não interpretam a resposta da plataforma.

**HostBridge.** Único ponto que conversa com a janela `parent`: gera `requestId`, deriva a origem exata do `parent` por `document.referrer`, envia `ready` só para essa origem (repetindo por uma janela curta), valida `event.source`, origem, tipo, versão, `requestId` e `contentId`, e limpa listeners e timers. Após cerca de 2,5 s sem resposta válida usa `allowAll`. Nunca usa `targetOrigin: "*"`.

### 2. Contrato postMessage v1

Do H5P para a plataforma (`ready`):

```json
{
  "type": "h5p-customizable-interactive-book:ready",
  "contractVersion": 1,
  "requestId": "<uuid>",
  "contentId": "123",
  "library": "H5P.CustomizableInteractiveBook",
  "chapters": [
    { "id": "<subContentId>", "title": "Introdução", "position": 0, "stable": true }
  ]
}
```

Da plataforma para o H5P (`policy`):

```json
{
  "type": "h5p-customizable-interactive-book:policy",
  "contractVersion": 1,
  "requestId": "<uuid>",
  "contentId": "123",
  "required": true,
  "teacherBypass": false,
  "chapters": {
    "<subContentId>": { "available": false, "message": "Conclua a atividade pré-requisito." }
  }
}
```

Invariantes: tipo e versão exatos (os campos diferenciam maiúsculas de minúsculas); a resposta repete `requestId` e `contentId` textual; `message` é texto simples; `required = false` indica integração ausente ou desabilitada; `teacherBypass = true` indica liberação pelo bypass com modo de edição ligado.

### 3. Fluxo de inicialização e capítulos bloqueados

1. O construtor sanitiza a configuração e cria o manifesto.
2. `HostBridge` solicita a política antes de qualquer runtime filho.
3. Política válida ou timeout cria o `AccessController`.
4. O runtime inicia exatamente uma vez (capa, páginas, menu lateral, barras de status).
5. Capítulo disponível: cria a instância filha. Capítulo bloqueado: cria só o placeholder acessível, com a mensagem inserida via `textContent`.

Capítulo bloqueado continua focável no menu (para a explicação ser lida), mas não executa a biblioteca filha, é ignorado por próximo/anterior e não entra em pontuação, progresso, conclusão, resumo, reset, soluções, estado nem xAPI. Se todos estiverem bloqueados, mostra-se o primeiro placeholder, sem resumo, pontuação zero e sem conclusão automática. O estado é guardado por UUID (`chaptersById`) e preservado para um desbloqueio futuro.

### 4. Instalar e configurar no Moodle

1. Compilar a biblioteca H5P (`npm ci` e `npm run build` no diretório `src`; `dist/` não vem no repositório) e instalá-la pela administração de bibliotecas H5P do Moodle. Confirmar versão 1.0.32 ou superior; versões anteriores não enviam o `ready` v1 e caem no fallback que libera tudo.
2. Copiar o plugin para `<moodle>/local/h5pchapteraccess` (ou usar o ZIP gerado pelo script de empacotamento do repositório).
3. Rodar `php admin/cli/upgrade.php --non-interactive` e `php admin/cli/purge_caches.php`.
4. Como professor editor ou gestor, abrir a atividade H5P e escolher **Chapter access** na navegação de configurações.
5. Habilitar a integração e definir, por capítulo, o modo `open`, `locked` ou `conditional`. No modo condicional usa-se o editor padrão da Availability API (data, grupo, agrupamento, nota, conclusão, perfil, com árvores AND/OR). A mensagem do capítulo vence a informação da condição, que vence a mensagem padrão da atividade.
6. Para ver a experiência do estudante, desligar o modo de edição; com edição ligada, a capability `viewlocked` libera todos os capítulos (bypass).

Capacidades (contexto do módulo): `local/h5pchapteraccess:manage` e `local/h5pchapteraccess:viewlocked`, ambas por padrão para gestor e professor editor.

### 5. Fronteiras de confiança

- O Moodle **não confia no manifesto do navegador**: o servidor extrai de novo `config.chapters` do pacote implantado e só devolve a decisão final por UUID.
- A ponte AMD exige `event.origin` igual à origem da página, `event.source` igual ao `contentWindow` do iframe com o `data-content-id` esperado, `requestId` limitado, responde uma vez por requisição e nunca usa `"*"`.
- O serviço AJAX exige login, visibilidade da atividade e `mod/h5pactivity:view`; não devolve condições, grupos, notas ou estrutura do curso.
- Condição inválida falha fechada com mensagem genérica; ausência de resposta (sem plugin, fora de iframe, origem indeterminada) falha **aberta** de propósito, para o uso autônomo.
- Dados no banco: tabelas por atividade e por capítulo, sem IDs de usuários nem decisões por usuário guardadas; capítulos ausentes do novo pacote ficam inativos, sem apagar a regra. Backup, restauração e duplicação reconciliam por UUID e remapeiam referências da Availability API.

### 6. Plano de testes

Biblioteca H5P:

```bash
cd src
npm ci
npm test
npm run lint
npm run build
```

Moodle (com banco PHPUnit separado):

```bash
php vendor/bin/phpunit --testcompanion local_h5pchapteraccess_testcompanion
npx grunt amd --root=local/h5pchapteraccess
php admin/cli/purge_caches.php
```

Cenários cobertos pela matriz (capítulos A, B, C):

- **Funcionais**: todos disponíveis; primeiro, intermediário ou último bloqueado; todos bloqueados; clique no menu e hash de capítulo bloqueado; próximo/anterior pulando bloqueados; estado por UUID após reorganizar; resumo parcial; reset, soluções e xAPI sem o bloqueado; ausência do plugin (timeout).
- **Availability API**: data futura/passada, grupo membro e não membro, conclusão anterior, nota, AND, OR, restrição oculta, bypass com edição ligada, pré-visualização com edição desligada, dois estudantes com resultados distintos.
- **Comunicação e segurança**: origem, source, `requestId` ou `contentId` inválidos, contrato ou tipo diferente, falha de AJAX, consulta anônima, usuário de outro curso.
- **Ciclo de vida**: adicionar, remover e reintroduzir capítulo; renomear e reorganizar; duplicar, restaurar em outro curso, excluir atividade, limpar cache.

Situação documentada: os testes automatizados de Node estão aprovados; os de PHPUnit estão escritos, mas a execução ficou pendente por ambiente; a validação manual exige Moodle real, navegador, estudante e professor, captura de xAPI e permissões de backup/restore.

### 7. Troubleshooting

- **Funciona em um Moodle e não em outro**: plugin, biblioteca H5P e regras no banco são três requisitos separados; copiar só a pasta do plugin não leva a biblioteca nem as regras.
- **Todos os capítulos aparecem após um atraso**: é o fallback. Verificar integração habilitada, ao menos um capítulo bloqueado ou condicional, AMD compilado, caches limpos e iframe de mesma origem.
- **Menu "Chapter access" ausente**: a atividade não usa a biblioteca ou o usuário não tem `manage`.
- **Capítulo não configurável**: está inativo ou com ID legado instável; republicar o H5P com `subContentId` estável e sincronizar (há também comando CLI de sincronização por `cmid`).
- **Alteração do pacote não aparece**: sincronizar de novo e limpar o cache.
- **Condição sempre bloqueada**: ativar depuração de desenvolvedor e validar o JSON no editor padrão.

## Quando escalar

- Falha persistente de instalação ou upgrade do plugin no Moodle de produção.
- Necessidade de proteger conteúdo confidencial (esta solução não protege; ver notas).
- Mudança de versão do Moodle fora da série 4.5.

## Equipe responsável

Equipe de desenvolvimento e administração do Moodle/AVA em conjunto com o autor da biblioteca.

## Links oficiais

- [Documentação do H5P](https://h5p.org/documentation)
- [Availability API do Moodle](https://moodledev.io/docs/apis/subsystems/availability)
- [Moodle: atividade H5P](https://docs.moodle.org/405/en/H5P_activity)

## Nível de confiabilidade

Prático. Os testes de Node foram aprovados; PHPUnit e validação manual estavam pendentes na documentação consultada.

## Notas adicionais

- **O bloqueio controla visualização, inicialização das bibliotecas filhas e navegação, mas o pacote H5P continua contendo os parâmetros originais dos capítulos.** Não apresentar como proteção de informação confidencial; esse conteúdo exige autorização no servidor e recursos separados.
- Licenças: biblioteca H5P sob MIT; plugin Moodle sob GPL v3 ou superior.
- Compatibilidade: plugin para Moodle 4.5 (build 2024100700 ou superior na série 4.5).
