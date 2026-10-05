---
title: "Configuração de clientes de e-mail institucional"
category: "E-mail"
service: "Webmail Institucional"
audience: ["TIC", "Suporte", "Usuários"]
tags: ["email", "outlook", "thunderbird", "smtp", "imap", "webmail"]
status: "prático"
last_review: "2026-10-05"
source: "Experiências trocadas entre colaboradores"
---

## Sintoma

Usuários precisam configurar clientes de e-mail (Outlook, Thunderbird, aplicativos móveis) para acessar o e-mail institucional, mas encontram dificuldades com servidores, portas ou autenticação.

## Contexto

O e-mail institucional pode ser acessado via webmail ou configurado em clientes locais. Problemas comuns incluem configuração incorreta de servidores, portas bloqueadas e atualizações em andamento.

## Procedimento

### 1. Webmail (acesso via navegador)

- URL: `https://webmail.ifrn.edu.br/`
- Usuário: matrícula do servidor ou aluno.
- Senha: senha do SUAP.
- Recomendado para acesso rápido e sem configuração.

### 2. Outlook (Windows)

1. Abrir o Outlook e adicionar nova conta.
2. Selecionar configuração manual.
3. Usar os seguintes parâmetros:
   - **Servidor de entrada (IMAP):** `webmail.ifrn.edu.br`
   - **Servidor de saída (SMTP):** `webmail.ifrn.edu.br`
   - **Porta IMAP:** 993 (SSL/TLS)
   - **Porta SMTP:** 587 (STARTTLS) ou 465 (SSL/TLS)
   - **Usuário:** matrícula
   - **Senha:** senha do SUAP
4. Concluir a configuração e testar envio/recebimento.

### 3. Thunderbird

1. Abrir o Thunderbird e adicionar nova conta de e-mail.
2. Inserir endereço de e-mail institucional e senha.
3. O Thunderbird deve detectar automaticamente as configurações.
4. Se necessário, configurar manualmente:
   - **Servidor de entrada (IMAP):** `webmail.ifrn.edu.br`
   - **Servidor de saída (SMTP):** `webmail.ifrn.edu.br`
   - **Porta IMAP:** 993 (SSL/TLS)
   - **Porta SMTP:** 587 (STARTTLS)
   - **Usuário:** matrícula
   - **Senha:** senha do SUAP
5. Testar envio e recebimento.

### 4. Aplicativos móveis (Android, iOS)

1. Abrir configurações de e-mail do dispositivo.
2. Adicionar nova conta.
3. Selecionar tipo de conta: IMAP.
4. Inserir parâmetros:
   - **Servidor de entrada:** `webmail.ifrn.edu.br`
   - **Servidor de saída:** `webmail.ifrn.edu.br`
   - **Porta IMAP:** 993 (SSL/TLS)
   - **Porta SMTP:** 587 (STARTTLS)
   - **Usuário:** matrícula
   - **Senha:** senha do SUAP
5. Salvar e testar.

### 5. Problemas comuns

#### Porta SMTP 25 bloqueada

- A porta SMTP 25 pode estar bloqueada por regras de segurança.
- Usar porta 587 (STARTTLS) ou 465 (SSL/TLS) para envio.

#### Imagens não carregam no webmail

- Problema conhecido em algumas versões do navegador.
- Solução temporária: usar cliente de e-mail local (Outlook, Thunderbird).

#### Anexos não aparecem

- Pode estar relacionado a atualizações em andamento no servidor.
- Solução temporária: usar cliente de e-mail local.

#### Erro de autenticação

- Verificar se a senha do SUAP está correta.
- Testar acesso ao webmail para confirmar credenciais.

## Quando escalar

- Quando o problema persistir após verificar todas as configurações.
- Quando houver indisponibilidade do serviço de e-mail.
- Quando múltiplos usuários relatarem o mesmo problema.

## Equipe responsável

DINRE (Diretoria de Infraestrutura de Redes e Serviços).

## Links oficiais

- [Webmail Institucional](https://webmail.ifrn.edu.br/)

## Nível de confiabilidade

Prático.

## Notas adicionais

- O Thunderbird tem sido relatado como mais estável que o Outlook em alguns cenários.
- Durante atualizações do servidor, pode haver instabilidade temporária.
- A porta SMTP 25 é frequentemente bloqueada por políticas de segurança.
