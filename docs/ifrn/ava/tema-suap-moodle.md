---
title: "Tema SUAP para Moodle e blocos da suíte de tema"
category: "AVA"
service: "AVA Moodle"
audience: ["TIC", "Desenvolvedores", "Administradores do AVA"]
tags: ["ava", "moodle", "tema", "theme_suap", "boost", "acessibilidade", "blocos", "course_gallery", "course_rating", "site_info", "recommendation"]
reliability: "prático"
last_review: "2026-10-08"
source: "Documentação dos plugins da suíte de tema SUAP para Moodle e experiências trocadas entre colaboradores"
---

## Sintoma

Administradores e desenvolvedores do AVA precisam instalar, configurar ou dar manutenção no tema visual do Moodle e nos blocos que compõem a página inicial e os painéis (galeria de cursos, avaliação de curso, recomendações e informações do site), e não sabem o que cada plugin faz ou quais pré-requisitos têm.

## Contexto

A suíte de tema SUAP para Moodle alinha a experiência do AVA com a identidade do SUAP. Ela reúne um tema (`theme_suap`) e quatro blocos (`block_course_gallery`, `block_course_rating`, `block_recommendation`, `block_site_info`). Todos são distribuídos sob GPL v3 ou posterior e já fazem parte da imagem Docker do AVA (ver artigo de build e release).

## Procedimento

### 1. Tema `theme_suap`

**O que é**: tema filho do **Boost**, desenvolvido para o ecossistema do IFRN (em especial o Campus Avançado Natal - Zona Leste).

**Requisitos**: Moodle 4.2 ou superior e o tema pai `theme_boost` instalado.

**Recursos principais**

- **Acessibilidade**: widget VLibras, modo amigável a disléxicos, alinhamento à esquerda (sem justificação), destaque de links, parar animações, ocultar imagens ilustrativas, cursor grande, maior espaçamento entre linhas e modos de cor/contraste (escuro e alto contraste).
- **Página inicial personalizada**: layout voltado a trilhas de aprendizagem e cursos, botões condicionais para visitantes e para estudantes logados, e cartões de curso com carga horária e indicador de certificado.
- **Página de matrícula**: visão geral do curso, lista de docentes (foto e descrição obtidas por endpoint próprio do tema), comentários de estudantes e botões de emissão de certificado.
- **Perfil do usuário em abas**: sobre mim, certificados e emblemas.
- **Administração**: abas de configurações gerais, avançadas e da página inicial; envio de presets SCSS; campos de SCSS bruto (inicial e pós-compilação).

**Instalação**

1. Colocar o código na pasta `theme/` do Moodle com o nome de diretório exatamente `suap` (caso contrário o Moodle não reconhece `theme_suap`).
2. Executar a atualização do banco de dados pela interface de administração ou por `php admin/cli/upgrade.php`.
3. Ativar em Administração do site, Aparência, Temas, Seletor de temas.

**Botões dinâmicos da página inicial**: configurados em uma caixa de texto administrativa, uma linha por botão, com campos separados por `|`:

```text
Rótulo | URL | Ícone FontAwesome | Target (_blank ou _self) | Capability exigida (ou N/A)
```

O rótulo pode ser texto puro ou uma string de idioma no formato `identificador,componente`. Exemplo:

```text
Início | / | fa-home | _self | N/A
Administração | /admin/search.php | fa-cogs | _self | moodle/site:config
```

**Estrutura de desenvolvimento**: `classes/` (navegação e renderizadores), `templates/` (Mustache), `scss/` (estilos modulares sob a pasta IFRN), `api/` (endpoint de dados de docentes), `lang/` (pt_br e en). O repositório usa GitHub Actions para análise estática (PHPCS, PHPMD), PHPUnit, Behat e empacotamento de releases.

### 2. `block_course_gallery` (Galeria de Cursos)

Exibe uma galeria responsiva de cursos abertos com autoinscrição ativa.

- **Cursos listados**: visíveis, diferentes da página inicial do site e com método de inscrição por autoinscrição habilitado, ordenados do mais novo ao mais antigo.
- **Busca e filtros**: busca por nome, carga horária (slider de 10 a 100 h), certificado, idioma e trilha de aprendizagem; paginação via Ajax e animação de carregamento (skeleton).
- **Pré-requisitos**: campos personalizados de curso `carga_horaria`, `tem_certificado` e `linguagem_conteudo`; e a tabela de associação entre cursos e trilhas (`suap_learning_path_course`). Sem os campos, o plugin emite avisos PHP.
- **Configuração do bloco**: título, categorias de cursos (sem categoria selecionada, a galeria fica vazia) e cursos por página.
- **Instalação**: pasta de destino obrigatoriamente `blocks/course_gallery`, depois atualização do banco.
- **Versionamento**: os dois últimos dígitos de `$plugin->version` devem coincidir com os dois últimos dígitos de `$plugin->release`; o workflow de release valida isso e falha se divergirem.
- **Limitações conhecidas** (documentação do plugin): o filtro de idioma ainda não é aplicado pela API; o filtro de trilha pode aparecer sem opções; a API depende de verificação de origem da requisição (Referer), que não é um controle de segurança forte; a filtragem é feita em PHP, sem cache; a busca dispara uma requisição por tecla; o slider depende de CDN externa; e depende do `theme_suap` para strings e ícones.
- Há documentação completa em Sphinx (pasta `docs/` do plugin) e testes PHPUnit da classe de repositório de cursos.

### 3. `block_course_rating` (Avaliação de Curso)

Permite que estudantes avaliem o curso com 1 a 5 estrelas e comentário.

- **Requisitos**: Moodle 3.11 ou superior; pasta `blocks/course_rating`.
- **Dados**: duas tabelas, uma com a avaliação atual de cada usuário por curso (nota, mensagem, usuário, curso, datas) e outra com o histórico de versões anteriores quando o usuário edita a avaliação.
- **Configuração**: o formulário aparece "após concluir o curso" (padrão) ou "enquanto estiver cursando".
- **Desenvolvimento**: JS e CSS ficam em `amd/src` e são minificados com Gulp (`npm install` e `npm run minify`).

### 4. `block_recommendation` (Recomendação)

Bloco de conteúdo HTML livre (avisos, banners, links, recomendações) editado pelo editor rich text do Moodle.

- **Requisitos**: Moodle 4.1 ou superior; maturidade estável.
- **Onde pode ser usado**: página inicial do site e painel do usuário (dashboard).
- **Uso**: ativar modo de edição, adicionar o bloco "Recommendation", abrir "Configurar bloco" e inserir o conteúdo. Suporta pt_BR e inglês.

### 5. `block_site_info` (Informações do Site)

Bloco institucional para exibir estatísticas ("o Moodle em números": anos de história, quantidade de cursos, alunos e certificados) ou qualquer HTML.

- **Requisitos**: Moodle 4.1 ou superior; pasta de destino obrigatoriamente `blocks/site_info`.
- **Configuração**: no modo de edição, adicionar o bloco e editar o HTML na caixa de texto de configuração. Disponível na página inicial e no painel.
- **Estilo**: CSS próprio com variáveis (fontes e cores) herdadas do tema SUAP; layout responsivo; template Mustache.

### 6. Dicas de manutenção

- Sempre atualizar o banco após copiar ou atualizar um plugin (`php admin/cli/upgrade.php`).
- Respeitar o nome exato das pastas de instalação; um nome diferente impede o reconhecimento do plugin.
- Ao personalizar o visual, preferir os campos de SCSS do tema em vez de editar arquivos do plugin, para facilitar atualizações.

## Quando escalar

- Quando um plugin não for reconhecido pelo Moodle mesmo com a pasta correta.
- Quando a galeria não listar cursos esperados após conferir categorias, autoinscrição e campos personalizados.
- Quando houver necessidade de alterar acessibilidade ou identidade visual institucional.

## Equipe responsável

Equipe de desenvolvimento do AVA (CTE/DEAD/ZL).

## Links oficiais

- [Documentação de temas do Moodle](https://moodledev.io/docs/apis/subsystems/output/theme)
- [Tema Boost](https://docs.moodle.org/en/Boost_theme)
- [VLibras](https://vlibras.gov.br)

## Nível de confiabilidade

Prático.

## Notas adicionais

- Links de arquivos locais e repositórios internos dos READMEs originais foram removidos desta página.
- As limitações da galeria de cursos se referem à versão analisada; verifique a versão instalada.
- Os blocos foram pensados para o tema SUAP; com outro tema, parte das variáveis de estilo, strings e ícones pode não funcionar.
