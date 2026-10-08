---
title: "Integração SUAP–Moodle: visão geral da arquitetura (Integrador AVA)"
category: "AVA"
service: "AVA"
audience: ["TIC", "Desenvolvedores", "Administradores Moodle"]
tags: ["ava", "moodle", "suap", "integrador-ava", "local_suap", "tool_sga", "painel-ava", "sincronização"]
reliability: "prático"
last_review: "2026-10-08"
source: "Documentação técnica da suíte SUAP-AVA (organização suap-ava-suite)"
---

## Sintoma

A equipe de TIC ou de desenvolvimento precisa entender como os diários do SUAP chegam ao Moodle (e como as notas voltam), quais componentes participam da integração e onde investigar quando uma sala não é criada ou os alunos não aparecem inscritos.

## Contexto

O SUAP (módulo Edu) é o Sistema de Gestão Acadêmica (SGA) e guarda o registro oficial. O Moodle é o AVA, onde as aulas acontecem. Quem faz a ponte é a suíte SUAP-AVA, composta por:

| Componente | Tipo | Função |
|---|---|---|
| Integrador AVA | Aplicação Django (middleware) | Recebe a requisição do SGA, escolhe o Moodle de destino, calcula coortes e repassa ao plugin |
| `local_suap` | Plugin Moodle (`local`) | Aplica no Moodle categorias, salas, usuários, coortes, inscrições, papéis e grupos; devolve notas |
| `tool_sga` | Plugin Moodle (`admin/tool`) | Alternativa ao `local_suap` para SGAs genéricos; também cria campos customizados |
| `auth_suap` | Plugin Moodle (`auth`) | Login via OAuth2 do SUAP (ver [SSO do Moodle com o SUAP](sso-moodle-auth-suap.md)) |
| Painel AVA | Aplicação Django | Interface única que reúne as salas de vários Moodle para o usuário |
| `tool_painelava` | Plugin Moodle (`admin/tool`) | Ponte entre o Moodle e o Painel AVA (web service e endpoints HTTP próprios) |

Fluxo geral:

```text
SUAP (SGA)  ->  Integrador AVA (Django)  ->  local_suap / tool_sga  ->  Moodle
   ^                                                                      |
   +------------------------ notas (sentido inverso) ---------------------+
```

A sincronização é sempre iniciada a partir do SUAP, por ação humana (professor, coordenação ou secretaria). O Integrador não consulta o SUAP por conta própria.

## Procedimento

### 1. Entender os brokers do Integrador

O Integrador suporta duas convenções de payload (Suap, específica do IFRN, e SGA, genérica) e três estratégias de integração, cada uma implementada por um *broker*:

| Broker | Payload recebido | Plugin Moodle | Status |
|---|---|---|---|
| `suap2local_suap` | Suap | `local_suap` | Implementado e em produção |
| `suap2tool_sga` | Suap (traduzido para SGA) | `tool_sga` | Em elaboração (ainda não implementado) |
| `sga2tool_sga` | SGA genérico | `tool_sga` | Em elaboração (ainda não implementado) |

Hoje, para o IFRN, o caminho em uso é `suap2local_suap`. Os dois brokers baseados no `tool_sga` existem como esqueleto; não dependa deles em produção.

### 2. Fluxo de envio de diário (SUAP para Moodle)

Endpoint do Integrador: `POST /api/enviar_diarios/`.

1. O SUAP envia JSON com os objetos `campus`, `curso`, `turma`, `componente` e `diario` (os campos de identificação são obrigatórios; payload incompleto retorna HTTP 422).
2. O Integrador valida o token enviado no cabeçalho `Authentication: Token <TOKEN_DO_INTEGRADOR>`.
3. Seleciona o **Ambiente** (o Moodle de destino) avaliando, em ordem de prioridade, a *expressão seletora* (`rule_engine`) de cada ambiente ativo. O primeiro que corresponder ao payload é usado. Se nenhum corresponder, HTTP 404.
4. Registra uma **Solicitação** (histórico auditável, com status pendente, sucesso ou falha).
5. Calcula as **coortes** elegíveis (papéis institucionais, como coordenação) e as injeta no payload.
6. Chama a API do plugin no Moodle (`/local/suap/api/index.php`) com o token do ambiente.
7. O plugin cria/atualiza categorias (hierarquia Diários > Campus > Curso > Semestre > Turma), a sala do diário, a sala de coordenação, usuários, coortes, inscrições, papéis e grupos (por entrada, turma, polo e programa). Alunos que saem da lista oficial são suspensos.
8. A resposta traz a URL da sala, a URL da sala de coordenação e a lista de papéis não encontrados; o Integrador devolve isso ao SUAP.

### 3. Fluxo de notas (Moodle para SUAP)

Endpoint do Integrador: `GET /api/baixar_notas/?campus_sigla=<SIGLA>&diario_id=<ID>`.

- O Integrador seleciona o ambiente pelo campus e pede ao plugin as notas do diário.
- A resposta é uma lista com matrícula, nota e identificador do diário.
- A leitura depende de o livro de notas do Moodle estar configurado com os identificadores corretos; ver [Diários no Moodle: procedimentos da secretaria, do professor e FAQ de TIC](configuracao-diario-notas-professor-secretaria.md).
- No `tool_sga`, o diário é localizado pelo `idnumber` do curso (que termina em `#<diario_id>`) e apenas os itens listados na configuração "Notas a sincronizar" são devolvidos. Atenção: a consulta usa recurso específico de PostgreSQL; em MariaDB/MySQL o endpoint pode falhar (não verificado em ambiente real).

### 4. Configurar uma integração (checklist)

1. **Plugin no Moodle**: instalar `local_suap` e definir um token de integração (valor livre, mas idêntico ao cadastrado no Ambiente do Integrador).
2. **Variáveis do Integrador**: definir o token que o SGA deve enviar (`SUAP_INTEGRADOR_KEY`), a chave secreta do Django (`DJANGO_SECRET_KEY`) e, opcionalmente, `SUAP_BASE_URL` e `DJANGO_LANGUAGE_CODE`. Nunca manter os valores padrão de exemplo em produção.
3. **Cadastrar o Ambiente** no admin do Integrador: nome, URL base do Moodle (sem barra final), token (idêntico ao do plugin), expressão seletora (por exemplo, `campus.sigla == "<SIGLA>"`), ordem de prioridade e flag de ativo.
4. **Cliente (SUAP)**: chamar os endpoints com `Authentication: Token <TOKEN_DO_INTEGRADOR>` e `Content-Type: application/json` nos POST.

### 5. Campos customizados

Os plugins criam, na instalação e nas atualizações, campos customizados usados por toda a suíte:

- **Curso/sala** (categorias Campus, Curso, Disciplina/Componente, Turma, Diário, Integrador AVA, Painel AVA): identificadores e descrições de campus, curso, disciplina, turma e diário; cargas horárias; datas da turma; nota mínima; indicação de sala de coordenação; grupos sincronizados; tipo de sala; autoinscrição e suas restrições.
- **Perfil do usuário** (categorias SUAP, Dados pessoais, Dados de contato, Matrícula, Polo, Campus, Curso, Turma): tipo de usuário e indicadores (servidor, aluno, docente etc.), nomes (apresentação, completo, social), e-mails institucionais, dados de matrícula, polo, campus, curso e última turma.

Os campos de perfil são bloqueados para edição pelo próprio usuário. Alguns contêm dados pessoais sensíveis; trate-os conforme a LGPD.

### 6. Painel AVA e `tool_painelava`

- O **Painel AVA** é uma aplicação separada que unifica, para o usuário, o acesso às salas de vários Moodle.
- O plugin `tool_painelava` expõe: (a) uma função de web service nativa do Moodle para listar os cursos do usuário; (b) endpoints HTTP próprios, autenticados por token em cabeçalho, para matrícula, suspensão, progresso, preferências, favoritos e visibilidade de curso.
- Também cria os campos de curso da categoria "Painel AVA" e uma tabela de log das chamadas.
- Funciona plenamente com o `local_suap` instalado (reaproveita configurações como autenticação e preferências padrão de usuário).

### 7. Troubleshooting rápido

| Sintoma | Verificação |
|---|---|
| HTTP 401 no Integrador | Token enviado pelo SUAP diferente de `SUAP_INTEGRADOR_KEY` |
| HTTP 404 | Nenhum Ambiente ativo casa com o payload: revisar expressão seletora e ordem |
| HTTP 422 | Campo obrigatório ausente no payload (a mensagem lista quais) |
| HTTP 525 | Falha ao calcular coortes antes de chamar o Moodle |
| 5xx | Erro ou indisponibilidade do Moodle/plugin; consultar a Solicitação no admin do Integrador |
| Sala criada no Moodle errado | Expressão seletora incorreta ou ordem de prioridade inadequada |
| Aluno ausente na sala | Matrícula não ativa no diário no SUAP ou diário não ressincronizado |

O admin do Integrador mantém o histórico de Solicitações (payload, status e erro), que é o primeiro lugar a consultar.

## Quando escalar

- Quando houver erro persistente (401, 404, 5xx) mesmo com token e ambiente corretos.
- Quando for necessário criar ou alterar Ambientes, tokens ou expressões seletoras (acesso administrativo ao Integrador).
- Quando houver indício de divergência entre dados do SUAP e do Moodle que a ressincronização não resolva.
- Quando a necessidade exigir os brokers ainda "em elaboração" (`tool_sga`).

## Equipe responsável

Equipe de TIC/AVA responsável pela suíte SUAP-AVA e pelos ambientes Moodle; equipe de desenvolvimento do SUAP para o lado do SGA.

## Links oficiais

- [Site oficial da suíte SUAP-AVA](https://suap-ava-suite.github.io/)
- [SUAP](https://suap.ifrn.edu.br)
- [Integração com a API do SUAP](../suap/integracao-api-suap.md)
- [SSO do Moodle com o SUAP (auth_suap)](sso-moodle-auth-suap.md)
- [Diários no Moodle: secretaria, professor e FAQ de TIC](configuracao-diario-notas-professor-secretaria.md)

## Nível de confiabilidade

Prático.

## Notas adicionais

- Modelo lógico recomendado: 1 diário no SUAP = 1 sala no Moodle; 1 matrícula = 1 usuário; 1 inscrição no diário = 1 inscrição na sala. Juntar vários diários em uma sala quebra a sincronização de notas.
- Não cadastre usuários manualmente no Moodle; a sincronização seguinte pode reverter ou ignorar essas alterações.
- As versões de Moodle declaradas como requisito mínimo diferem das efetivamente testadas em CI; considere a faixa testada como a garantia real (por exemplo, `local_suap` testado em Moodle 4.1 a 4.3; `tool_painelava` e `auth_suap` em 4.5 ou superior).
- O Integrador possui interface em português, inglês, espanhol, francês e chinês simplificado.
- Os tokens e chaves citados são segredos: guarde-os fora de repositórios e nunca os compartilhe em chamados ou chats.
