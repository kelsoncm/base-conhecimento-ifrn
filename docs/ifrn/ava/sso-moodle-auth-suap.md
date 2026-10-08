---
title: "SSO do Moodle com o SUAP (plugin auth_suap)"
category: "AVA"
service: "AVA"
audience: ["TIC", "Administradores Moodle"]
tags: ["ava", "moodle", "sso", "oauth2", "auth_suap", "suap", "autenticação", "privacidade"]
reliability: "prático"
last_review: "2026-10-08"
source: "Documentação técnica da suíte SUAP-AVA (organização suap-ava-suite)"
---

## Sintoma

O administrador do Moodle precisa permitir que usuários entrem com a conta do SUAP (login único), ou está diagnosticando falhas nesse login, dados de perfil desatualizados ou dúvidas sobre quais dados pessoais trafegam.

## Contexto

`auth_suap` é um plugin de autenticação do Moodle construído sobre o `auth_oauth2` do núcleo. Ele usa o fluxo OAuth2 *Authorization Code* contra o SUAP e, a cada login bem-sucedido, cria ou atualiza o usuário no Moodle e sincroniza dados institucionais em campos de perfil customizados.

Requisitos:

- Moodle 4.5 ou superior (versão testada em CI: 4.5).
- PHP 8.3 ou superior, com cURL habilitado.
- Plugin `auth_oauth2` do núcleo habilitado.
- Opcional: `local_suap`, cujas preferências padrão de usuário são aplicadas apenas na criação da conta.

A autenticação por este plugin não é obrigatória na integração SUAP–Moodle, mas é recomendada para uma experiência de login unificada. Para o contexto geral, ver [Integração SUAP–Moodle: visão geral](integracao-suap-moodle-visao-geral.md). Para os conceitos de OAuth2 e das APIs do SUAP, ver [Integração com a API do SUAP](../suap/integracao-api-suap.md).

## Procedimento

### 1. Registrar a aplicação OAuth2 no SUAP

1. No SUAP, pesquisar por **auth** e abrir **Aplicações OAUTH2**.
2. Clicar em **Adicionar Aplicação OAUTH2** e preencher:
   - **Nome**: descrição da instância do Moodle.
   - **Authorization grant type**: `Authorization code`.
   - **Redirect URIs**: as três URLs de retorno do Moodle: `https://<MOODLE>/auth/suap/authenticate.php`, `https://<MOODLE>/admin/oauth2callback.php` e `https://<MOODLE>/authenticate.php`.
   - **Client type**: `Public`.
   - **Algorithm**: `No OIDC support`.
   - **Ativo**: marcado.
3. Salvar. O **Client ID** e o **Client Secret** serão exibidos.

O Client Secret é mostrado uma única vez. Guarde-o imediatamente em local seguro; se for perdido, é preciso registrar nova aplicação. Nunca o publique em documentos, chamados ou repositórios.

### 2. Habilitar o plugin no Moodle

1. **Administração do site > Plugins > Autenticação > Gerenciar autenticação**: habilitar **SUAP**.
2. Definir a **URL alternativa para login** (`alternateloginurl`) como `https://<MOODLE>/auth/suap/login.php`.
3. Salvar.

Cuidado: com a URL alternativa definida, todos os logins passam a ser redirecionados ao SUAP. Antes de salvar, garanta que já existe ao menos um usuário administrador com autenticação OAuth2 funcional (ou outro acesso de emergência), para não ficar bloqueado fora do Moodle.

### 3. Configurar o plugin

Em **Administração do site > Plugins > Autenticação > SUAP**, preencher:

| Campo | Valor |
|---|---|
| Client ID | `<CLIENT_ID>` gerado no SUAP |
| Client Secret | `<CLIENT_SECRET>` gerado no SUAP |
| Authorize URL | `https://suap.ifrn.edu.br/o/authorize/` |
| Token URL | `https://suap.ifrn.edu.br/o/token/` |
| RH/EU URL | `https://suap.ifrn.edu.br/api/rh/eu/` |
| RH/Meus Dados URL | `https://suap.ifrn.edu.br/api/rh/meus-dados/` |
| RH/Meus Vínculos URL | `https://suap.ifrn.edu.br/api/rh/meus-vinculos/` |
| Ensino/Meus Dados Aluno URL | `https://suap.ifrn.edu.br/api/ensino/meus-dados-aluno/` |
| Logout URL | `https://suap.ifrn.edu.br/comum/logout/` |

Os campos já vêm preenchidos a partir da variável de ambiente `SUAP_BASE_URL` (padrão: `https://suap.ifrn.edu.br`).

### 4. Testar

- Clicar em entrar: o usuário é levado à tela de autenticação do SUAP.
- Usuário já existente tem os dados atualizados; inexistente tem a conta criada automaticamente.
- O endpoint `/auth/suap/health.php` (exige login) mostra as configurações ativas em JSON, sem revelar o Client Secret; útil para diagnóstico.

### 5. Como funciona o fluxo

1. `login.php` redireciona o usuário ao SUAP (`authorize_url`) com `client_id` e `redirect_uri`.
2. O usuário se autentica no SUAP e retorna com um `code`.
3. `authenticate.php` troca o `code` por um `access_token` no `token_url`. Em erro, o usuário vê uma tela amigável com botão para reiniciar o login (o erro bruto não é exposto).
4. Com o token, o plugin consulta quatro endpoints do SUAP e mescla os resultados (RH/EU, Meus Dados, Meus Vínculos e Ensino/Meus Dados Aluno). A consulta de dados de aluno é tolerante a falhas: se o usuário não for aluno, o login segue normalmente.
5. O usuário é criado ou atualizado e a foto, se existir, é baixada e aplicada.
6. A sessão é autenticada e o usuário vai ao destino original (`next`/`wantsurl`).

Logout: ao sair, o usuário vê uma página de confirmação para encerrar também a sessão no SUAP ou permanecer conectado a ele.

### 6. Sincronização de dados do usuário

- **Nome de usuário**: identificação (ou matrícula, como alternativa) do SUAP, em minúsculas. Sem nenhum dos dois, o login falha.
- **Na criação**: senha local aleatória (ignorada, pois a autenticação é sempre via SUAP), fuso horário padrão, conta confirmada e, se `local_suap` estiver instalado, as preferências padrão de usuário.
- **Em todo login**: nome e sobrenome (origem do nome configurável: social, usual ou de registro, com regra de divisão em nome/sobrenome), e-mail, método de autenticação, foto e dezenas de campos de perfil.
- **Campos de perfil** (categorias SUAP, Dados pessoais, Dados de contato, Matrícula, Polo, Campus, Curso e Turma): tipo de usuário e indicadores (aluno, docente, servidor etc.), nomes, e-mails institucionais, dados de vínculo e matrícula, campus, curso, polo e turma.
- Os campos são criados bloqueados para edição pelo usuário e o bloqueio é replicado a todos os plugins de autenticação instalados. O campo que guarda o JSON do último login fica oculto e serve para suporte.
- O plugin descarta de algumas respostas dados que não precisa guardar (por exemplo, tipo sanguíneo).

### 7. Privacidade (LGPD)

- O plugin implementa a API de privacidade do Moodle e declara o SUAP como destino externo de dados (nome de usuário, e-mail, nome, sobrenome, CPF e tipo de usuário) em **Administração do site > Privacidade e políticas > Registro de localizações de dados de usuários**.
- Não há tabelas próprias com dados pessoais: tudo fica nas tabelas padrão `user` e `user_info_data`; exportação e exclusão seguem o fluxo padrão do Moodle.
- Os campos de perfil contêm dados pessoais (por exemplo, documentos e datas). Restrinja quem pode visualizá-los e não os exponha em relatórios sem necessidade.

### 8. Troubleshooting

| Sintoma | Causa provável / ação |
|---|---|
| Erro de configuração incompleta no login | `authorize_url` ou `client_id` não configurados |
| Tela de erro de autenticação após o retorno do SUAP | Client ID/Secret incorretos, redirect URI não cadastrada exatamente, ou SUAP indisponível |
| Erro de identificação ausente | Resposta do SUAP sem identificação nem matrícula; verificar vínculos do usuário no SUAP |
| Administrador bloqueado fora do Moodle | URL alternativa definida sem admin OAuth2 prévio; remover a configuração via banco/CLI ou acesso de emergência |
| Dados de perfil desatualizados | Os dados só são atualizados no login; peça novo login após a correção no SUAP |
| Campos de perfil ausentes | Campos são criados na instalação/atualização do plugin; executar a atualização do Moodle |

## Quando escalar

- Quando for preciso registrar ou alterar a aplicação OAuth2 no SUAP sem permissão para isso.
- Quando o login falhar com credenciais e URIs conferidas.
- Quando houver suspeita de vazamento ou uso indevido do Client Secret (revogar e registrar nova aplicação).
- Quando houver dúvidas jurídicas sobre o tratamento de dados pessoais.

## Equipe responsável

Equipe de TIC/AVA (administração do Moodle); administradores do SUAP para o cadastro da aplicação OAuth2.

## Links oficiais

- [Site oficial da suíte SUAP-AVA](https://suap-ava-suite.github.io/)
- [SUAP](https://suap.ifrn.edu.br)
- [Integração com a API do SUAP](../suap/integracao-api-suap.md)
- [Integração SUAP–Moodle: visão geral](integracao-suap-moodle-visao-geral.md)

## Nível de confiabilidade

Prático.

## Notas adicionais

- O plugin tem textos em português, inglês, espanhol, francês, neerlandês e chinês.
- Documentação antiga citava um endpoint adicional (`dispatch.php`) que não existe mais no código atual; ignore referências a ele.
- O Client Secret é enviado pelo plugin ao SUAP como credencial; trate-o como senha.
