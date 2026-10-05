---
title: "Limites de envio de e-mail no webmail institucional"
category: "E-mail"
service: "Webmail"
audience: ["TIC", "Suporte", "Usuários"]
tags: ["email", "webmail", "limites", "envio", "smtp", "spam"]
status: "prático"
last_review: "2026-10-05"
source: "Experiências trocadas entre colaboradores"
---

## Sintoma

Usuários recebem mensagem de erro informando que atingiram limite de envio de e-mails ou têm dúvidas sobre quantos e-mails podem enviar por dia/hora.

## Contexto

O servidor de e-mail institucional possui limites de envio para prevenir abuso, spam e sobrecarga do sistema.

## Procedimento

### 1. Limites vigentes

- **200 mensagens por dia** por conta de e-mail.
- **50 mensagens por hora** por conta de e-mail.
- Limites aplicam-se tanto ao webmail quanto a clientes configurados (Outlook, Thunderbird).

### 2. Quando o limite é atingido

- Usuário recebe mensagem de erro ao tentar enviar e-mail.
- Erro pode mencionar "quantidade máxima atingida" ou "rate limit".
- Envios subsequentes serão bloqueados até o limite ser resetado.

### 3. Tempo de reset do limite

- Limite diário: resetado após 24 horas da primeira mensagem do dia.
- Limite horário: resetado após 1 hora da primeira mensagem da hora.
- Não há procedimento para reset manual antecipado.

### 4. Alternativas para envio em massa

#### Para comunicações institucionais

- Usar listas de distribuição oficiais.
- Solicitar apoio da comunicação institucional.
- Considerar outras ferramentas (ex: Moodle, comunicados no SUAP).

#### Para comunicações de turma

- Usar o próprio SUAP para envio de comunicados.
- Utilizar o Moodle para turmas e disciplinas.
- Dividir envio em múltiplos dias (respeitando limites).

### 5. Boas práticas

- Evitar envio de e-mails em massa para múltiplos destinatários individuais.
- Usar cópia oculta (CCO) quando necessário enviar para vários destinatários.
- Planejar comunicações importantes com antecedência.
- Considerar o impacto no servidor e na experiência dos destinatários.

### 6. Problemas relacionados

#### Erro de autenticação

- Pode ser confundido com limite de envio.
- Verificar credenciais e configuração do cliente de e-mail.

#### E-mails na fila de saída

- Se muitos e-mails estiverem na fila, podem atingir o limite rapidamente.
- Limpar fila ou aguardar reset do limite.

#### Contas comprometidas

- Se a conta estiver enviando spam sem conhecimento do usuário, pode atingir o limite.
- Trocar senha imediatamente.
- Verificar se há regras ou forwarders suspeitos.

## Quando escalar

- Quando o limite estiver claramente inadequado para necessidades legítimas.
- Quando houver suspeita de comprometimento da conta.
- Quando múltiplos usuários relatarem o mesmo problema simultaneamente.

## Equipe responsável

DINRE (Diretoria de Infraestrutura de Redes e Serviços).

## Links oficiais

- [Webmail Institucional](https://webmail.ifrn.edu.br/)

## Nível de confiabilidade

Confirmado.

## Notas adicionais

- Limites são padrão em servidores de e-mail corporativos/educacionais.
- O propósito é prevenir abuso e garantir qualidade do serviço para todos.
- Não há procedimento oficial para aumentar limites individualmente.
- Para necessidades específicas de envio em massa, consultar a equipe de comunicação.
