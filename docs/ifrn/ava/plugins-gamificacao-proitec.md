---
title: "Plugins de gamificação do ProITEC no Moodle"
category: "AVA"
service: "AVA Moodle"
audience: ["TIC", "Desenvolvedores", "Professores", "Administradores do AVA"]
tags: ["ava", "moodle", "proitec", "gamificação", "mod_codexproitec", "mod_mapaproitec", "mod_medalhasproitec", "mod_multiprogress", "block_multiprogress"]
reliability: "prático"
last_review: "2026-10-08"
source: "Documentação dos plugins ProITEC e experiências trocadas entre colaboradores"
---

## Sintoma

Equipes que montam ou mantêm a oferta do curso autoinstrucional ProITEC (preparação de estudantes do 9º ano para o exame de seleção do IFRN) precisam saber quais plugins de gamificação existem, o que cada um faz, como instalá-los e como migrar do bloco legado `block_multiprogress`.

## Contexto

O ProITEC usa quatro disciplinas, cada uma associada a um código de curso e a uma "gema" ou "pedra" de conhecimento:

| Disciplina | Código |
|-----------|--------|
| Língua Portuguesa | FIC.1195 |
| Matemática | FIC.1196 |
| Ética e Cidadania | FIC.1197 |
| Seminário de Integração | FIC.1198 |

A gamificação é feita por quatro módulos de atividade (`mod_`) que se complementam. Todos são distribuídos sob GPL v3 e já fazem parte da imagem Docker do AVA.

## Procedimento

### 1. `mod_codexproitec` (Codex ProITEC)

Gerencia a coleção de **Gemas do Conhecimento** e a recompensa final.

- Apresenta um livro interativo (o Codex) que reúne as conquistas do estudante.
- Cada disciplina concluída a 100% libera uma gema; com as quatro gemas a chave do Codex é completada.
- **Recompensa**: liberação de um Mapa de Dicas para o exame de seleção do ProITEC.
- Papel pedagógico: principal motivador de engajamento da suíte, evitando que o estudante abandone qualquer disciplina.

### 2. `mod_mapaproitec` (Mapa ProITEC)

Mapa interativo do Rio Grande do Norte que representa a jornada do estudante pelas mesorregiões e campi do IFRN.

- Estados do mapa: ativo (iluminado) e inativo (bloqueado antes da liberação pedagógica); o acesso pode ser ativado ou desativado conforme o calendário.
- Marcadores: bloqueado, visitado e concluído.
- Rastreia o progresso e se integra à liberação de novos recursos do curso.
- Valor pedagógico: reforça o sentimento de pertencimento ao IFRN.

### 3. `mod_medalhasproitec` (Medalhas ProITEC)

Sistema de conquistas com oito medalhas e mensagem de comemoração (popup) ao desbloquear:

| Medalha | Critério resumido |
|---------|------------------|
| Sentinela do Codex | Obter o Codex e ter progresso maior que zero |
| Maratonista do Conhecimento | Concluir todos os vídeos interativos das disciplinas |
| Busca pelo Saber | Ler ao menos um livro H5P |
| Mestre do Portal | Acertar pelo menos 50% em todos os questionários |
| Amante dos Números | 100% em Matemática |
| Amante das Palavras | 100% em Língua Portuguesa |
| Orgulho da Comunidade | 100% em Ética e Cidadania |
| Entusiasta do IFRN | 100% em Seminário de Integração |

O objetivo é dar reforço positivo imediato e reduzir a evasão do curso autoinstrucional.

### 4. `mod_multiprogress` (Multi Progress ProITEC)

Mostra, em um único lugar, barras de progresso por disciplina (as quatro trilhas) e a evolução das pedras/gemas rumo à chave do Codex. Dá autonomia ao estudante para ver em qual disciplina está atrasado. É o **substituto oficial** do bloco legado.

### 5. `block_multiprogress` (descontinuado) e guia de migração

O bloco foi o pioneiro na exibição de progresso por trilha e está **descontinuado**; novas ofertas devem usar `mod_multiprogress`.

Para migrar uma sala virtual:

1. Remova o bloco `block_multiprogress` da barra lateral da sala.
2. Em "Adicionar uma atividade ou recurso", selecione **Multi Progress ProITEC**.
3. Adicione a atividade ao tópico desejado.
4. Após migrar todas as salas, o bloco pode ser desinstalado.

### 6. Instalação (qualquer módulo)

- **Pela interface**: baixar o `.zip` da release, ir a Administração do site, Plugins, Instalar plugins, enviar o arquivo e concluir a atualização do banco.
- **Manual**: colocar o código na pasta `mod/<nome>` do Moodle (`codexproitec`, `mapaproitec`, `medalhasproitec`, `multiprogress`) e acessar Administração do site, Notificações (ou `php admin/cli/upgrade.php`).
- Em ambientes com a imagem Docker do AVA, os plugins já vêm instalados; a atualização é feita por novo release da imagem.

### 7. Dependências entre os plugins

Os módulos compartilham o contexto das quatro disciplinas e dependem dos tipos de atividade usados nos cursos (vídeos interativos, livros H5P e questionários). Se a estrutura dos cursos mudar (códigos das disciplinas, tipo de atividade), as regras de medalhas e de progresso precisam ser revistas.

## Quando escalar

- Medalhas ou gemas não liberadas apesar de a conclusão estar correta (possível divergência de código de disciplina ou do tipo de atividade).
- Necessidade de novas regras, trilhas ou disciplinas.
- Falha de instalação ou atualização de banco ao adicionar o plugin.

## Equipe responsável

Equipe de desenvolvimento do AVA (CTE/DEAD/ZL), responsável pela suíte ProITEC.

## Links oficiais

- [Instalação de plugins no Moodle](https://docs.moodle.org/en/Installing_plugins)
- [Conclusão de atividade no Moodle](https://docs.moodle.org/en/Activity_completion)
- [Conteúdo H5P no Moodle](https://docs.moodle.org/en/H5P)

## Nível de confiabilidade

Prático.

## Notas adicionais

- Os repositórios, autores e contatos presentes nos READMEs originais foram omitidos desta página.
- Os critérios das medalhas foram descritos de forma resumida; valide na versão instalada.
- Os arquivos `CHANGELOG` dos módulos analisados estavam vazios, portanto não há histórico de mudanças a registrar aqui.
- Cada módulo possui documentação HTML ilustrada na pasta `docs/` do respectivo repositório.
