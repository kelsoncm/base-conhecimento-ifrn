---
title: "Bloqueio e Edição de CPF e Campos de Perfil no Moodle (SUAP e Moodle Aberto)"
category: "AVA"
service: "AVA"
audience: ["TIC", "Administradores Moodle"]
tags: ["moodle", "cpf", "auth_suap", "local_suap", "perfil", "autenticação", "moodle-aberto"]
reliability: "prático"
last_review: "2026-10-09"
source: "Resolução de problemas de bloqueio de CPF e simplificação de formulário no Moodle Aberto"
---

## Sintoma

Usuários cadastrados no Moodle (como no Moodle Aberto via auto-cadastro por e-mail ou contas manuais) não conseguem editar o próprio CPF ou outros campos de perfil na página de edição (`/user/edit.php`), mesmo quando na tela de administração do campo (*Campos do perfil do usuário*) a opção **"Este campo está trancado?"** está configurada como **"Não"**.

## Contexto

O Moodle possui dois níveis independentes de controle de edição para campos de perfil customizados (`user_info_field`):

1. **Trava Global no Campo (`user_info_field.locked`)**: Quando definida como `1`, impede a edição do campo no perfil para qualquer usuário comum do site, independente de qual plugin de autenticação ele utilize.
2. **Trava por Plugin de Autenticação (`field_lock_profile_field_<campo>`)**: Armazenada nas configurações de cada plugin de autenticação (tabela `config_plugins`), determina se o campo fica bloqueado para usuários que autenticam por aquele método específico.

### O "Bloqueio Fantasma"

Nas telas de configuração de bloqueio de campos dos plugins de autenticação nativos do Moodle (como `auth_email`, `auth_manual` ou `auth_oauth2`), o Moodle exibe apenas os campos nativos do usuário (`firstname`, `lastname`, `email`, etc.) e **não exibe dropdowns para campos customizados de perfil** (como `cpf`).

Em versões do plugin `auth_suap` anteriores à `v4.5.083`, o script de migração definia `locked = 1` globalmente e forçava `set_config('field_lock_profile_field_*', 'locked', 'auth_' . $auth)` para **todos** os plugins de autenticação instalados. Isso criava um **bloqueio fantasma**: o banco registrava o campo como bloqueado para o `auth_email` e `auth_manual`, mas o administrador não conseguia visualizar nem alterar essa trava na interface nativa desses plugins.

## Procedimento

### 1. Desbloquear a Edição de CPF no Moodle Aberto

Para instâncias onde os usuários se auto-cadastram ou utilizam login manual/e-mail (como no Moodle Aberto):

1. **Ajustar a Trava Global do Campo**:
   - Acesse **Administração do site > Usuários > Contas > Campos do perfil do usuário** (`/user/profile/index.php`).
   - Edite o campo **CPF**.
   - Garanta que **Este campo está trancado?** esteja como **Não**.
   - Se for desejável solicitar o CPF no momento do registro, marque **Mostrar na página de cadastro?** como **Sim**.

2. **Remover Travas Fantasma de Outros Plugins de Autenticação (se houver)**:
   Se o campo continuar desabilitado para usuários de `auth_email` ou `auth_manual`, execute a limpeza das travas residuais no banco do Moodle:

   ```sql
   DELETE FROM mdl_config_plugins 
   WHERE name LIKE 'field_lock_profile_field_%' 
     AND plugin IN ('auth_email', 'auth_manual', 'auth_oauth2');
   ```

   Ou via script PHP CLI / console do Moodle:

   ```php
   unset_config('field_lock_profile_field_cpf', 'auth_email');
   unset_config('field_lock_profile_field_cpf', 'auth_manual');
   unset_config('field_lock_profile_field_cpf', 'auth_oauth2');
   ```

### 2. Simplificação do Formulário de Perfil no Moodle Aberto

Para proporcionar uma experiência de cadastro mais ágil e amigável:

1. **Campos Visíveis**: Deixe como visíveis e editáveis apenas os campos essenciais:
   - Nome completo
   - Nome social
   - CPF
   - RG
   - Passaporte
2. **Ocultar Campos Não Utilizados**: Marque os demais campos customizados de perfil como **"Não visível"** (`visible = 0`). A partir da versão `v4.5.084` do `auth_suap`, a visibilidade customizada pelo administrador é preservada durante atualizações do plugin.
3. **Ocultar Seções Secundárias do Formulário**:
   - No Moodle, seções como *Outros nomes* (`additional_names`), *Interesses* (`interests`) e *Opcional* (`optional`) podem ser desabilitadas ou ocultadas nas configurações de perfil do site para simplificar o formulário do aluno.

### 3. Comportamento no `auth_suap` (v4.5.083 e v4.5.084+)

- A partir da versão `v4.5.083`, o plugin `auth_suap` aplica o bloqueio de edição de campos de perfil (`field_lock_profile_field_* = locked`) **exclusivamente para a sua própria autenticação (`auth_suap`)**, sem afetar outros métodos de login.
- A partir da versão `v4.5.084`, o `auth_suap` não sobrescreve a visibilidade (`visible`) dos campos existentes, permitindo que a simplificação de formulário realizada no Moodle Aberto seja mantida.

## Solução de problemas

| Sintoma | Causa provável | Ação corretiva |
|---|---|---|
| CPF desabilitado na edição de perfil | Trava `field_lock_profile_field_cpf` ativa no plugin de autenticação do usuário | Executar a limpeza de `config_plugins` para o plugin de autenticação correspondente (`auth_email`, `auth_manual`) |
| Campo CPF não aparece no auto-cadastro | Opção *Mostrar na página de cadastro?* definida como *Não* | Alterar para *Sim* em *Campos do perfil do usuário* |
| Atualização do `auth_suap` torna visíveis campos ocultos | Versão legada do plugin sobrescrevendo `visible = 1` | Atualizar o plugin `auth_suap` para a versão `4.5.084` ou superior |

## Nível de confiabilidade

Prático.

## Notas adicionais

- Para usuários que realizam login via SUAP (`auth_suap`), os dados de perfil continuam sendo sincronizados automaticamente a cada login a partir do SUAP.
- No Moodle Aberto, o usuário é a autoridade das suas informações cadastrais locais, justificando a permissão de edição do próprio CPF.
