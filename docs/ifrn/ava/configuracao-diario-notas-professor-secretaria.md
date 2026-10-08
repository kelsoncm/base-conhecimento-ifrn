---
title: "Diários no Moodle: procedimentos da secretaria, do professor e FAQ de TIC"
category: "AVA"
service: "AVA"
audience: ["Secretaria Acadêmica", "Professores", "TIC"]
tags: ["ava", "moodle", "suap", "diário", "notas", "livro-de-notas", "sincronização", "secretaria", "faq"]
reliability: "prático"
last_review: "2026-10-08"
source: "Documentação técnica da suíte SUAP-AVA (organização suap-ava-suite)"
---

## Sintoma

- Um diário ou sala de coordenação não aparece no Moodle.
- Alunos matriculados no SUAP não enxergam a sala, ou a lista de inscritos está desatualizada.
- A importação de notas do Moodle para o SUAP traz valores em branco ou errados.
- Dúvidas sobre quem cadastra o quê e quando a sincronização acontece.

## Contexto

O **SUAP** guarda o registro acadêmico oficial (matrículas, diários, notas consolidadas). O **Moodle** é a sala de aula digital; nenhum registro acadêmico oficial nasce nele. A integração copia do SUAP para o Moodle as salas e inscrições e traz de volta as notas. Detalhes da arquitetura em [Integração SUAP–Moodle: visão geral](integracao-suap-moodle-visao-geral.md).

A sincronização é sempre disparada manualmente a partir do SUAP, por professor, coordenação ou secretaria.

## Procedimento

### A. Secretaria acadêmica

**Habilitar a integração do diário**

1. No módulo acadêmico do SUAP, localizar o diário da disciplina (turma e período letivo vigentes).
2. Na página de gerenciamento do diário, ativar a opção **Integração com Moodle** (ou **Integração com AVA**). Isso autoriza o provisionamento do diário no Moodle.
3. Para **salas de coordenação de curso**, a mesma regra vale: habilitar nas opções de gerenciamento do curso no SUAP.

**O que acontece depois**

1. O diário fica elegível à sincronização.
2. O professor (ou a secretaria) clica em **Sincronizar** na página do diário.
3. O Integrador cria as categorias de campus, curso, semestre e turma e, por fim, a sala do diário.
4. Alunos regularmente matriculados (situação ativa no diário) e docentes associados no SUAP são inscritos automaticamente.

**Problemas comuns**

| Situação | Causa provável | Ação |
|---|---|---|
| Aluno não vê a sala | Matrícula trancada ou cancelada, ou matrícula tardia sem nova sincronização | Conferir a situação no SUAP (só alunos ativos no diário ficam ativos no Moodle) e ressincronizar o diário |
| Diário não aparece na lista de integração | Componente ou curso sem a flag de integração na matriz curricular | Verificar com a coordenação ou a TIC se a matriz permite diários integrados ao AVA |
| Sala criada no Moodle errado | Regra de roteamento (expressão seletora) do ambiente incorreta | Acionar a TIC para revisar a expressão seletora no Integrador |

Regras de ouro: turmas e diários são criados sempre no SUAP, nunca manualmente no Moodle; cadastros de estudantes, docentes, tutores e mediadores também são feitos no SUAP. Inclusões, cancelamentos e transferências de matrícula são registrados primeiro no SUAP e só chegam ao Moodle na próxima sincronização do diário.

### B. Professor

**Sincronizar o diário (SUAP para Moodle)**

1. Abrir o diário no SUAP.
2. Clicar em **Sincronizar com o AVA**.
3. Aguardar alguns segundos: a sala é criada e alunos e docentes secundários (tutores, mediadores) são inscritos.
4. O SUAP exibirá o link direto para a sala. Repita a sincronização sempre que houver mudança de matrículas.

**Importar notas (Moodle para SUAP)**

1. No diário do SUAP, clicar em **Importar Notas do Moodle** (ou **Sincronizar Notas**).
2. O SUAP busca a nota de cada estudante e preenche a caderneta.
3. Revisar e clicar em **Salvar** para consolidar.

A importação não é automática nem em tempo real; ela ocorre quando o professor decide consolidar.

**Configuração obrigatória do livro de notas do Moodle**

O SUAP só consegue ler as notas se cada avaliação do livro de notas tiver, no campo **Número de identificação** (*ID number*), a sigla padrão do SUAP. Sem isso, a importação traz valores em branco ou errados.

| Sigla (ID number) | Avaliação |
|---|---|
| `N1` | Primeira avaliação |
| `N2` | Segunda avaliação |
| `N3` | Terceira avaliação (se aplicável) |
| `N4` | Quarta avaliação (se aplicável) |
| `NAF` | Avaliação final |

Passo a passo:

1. No curso do Moodle, abrir **Notas**.
2. Trocar a visão para **Configuração do Livro de Notas**.
3. Na linha da **categoria** que agrupa a etapa (por exemplo, a média da etapa 1) ou da **atividade** única que vale a etapa, clicar em **Editar > Editar configurações**.
4. Em **Item de nota** (clique em *Mostrar mais* se necessário), preencher **Número de identificação** com a sigla, exatamente em maiúsculas.
5. **Salvar mudanças** e repetir para as demais etapas.

O identificador diferencia maiúsculas de minúsculas: `n1` ou `Nota 1` fazem a integração falhar para aquele item. A nota importada é a nota final consolidada do item ou categoria identificado. Você pode usar qualquer metodologia de avaliação prevista no PPC, desde que a nota final de cada etapa esteja no item com a sigla correta.

### C. FAQ de TIC

- **Quem cadastra os usuários?** A origem de estudantes, docentes, mediadores e tutores é sempre o SUAP. Coordenadores e outros papéis institucionais são cadastrados no Integrador e enviados ao Moodle como coortes, distribuídas por um motor de regras (*rule engine*).
- **A sincronização é automática?** Para diários de classe, é manual (professor, coordenação ou secretaria). É tecnicamente possível agendar no SUAP, mas não se recomenda: divergências temporárias entre notas do Moodle e do SUAP poderiam ser atribuídas indevidamente à TIC. Cursos FIC de curta duração (menos de 10 h) são simplificados: o envio é manual, mas o retorno das notas é automático.
- **Fluxo técnico**: o SUAP aciona o Integrador AVA, que se comunica com o Moodle. O Moodle só é atualizado com movimentações de alunos quando um novo disparo é feito.
- **Tutores e mediadores precisam de acesso ao SUAP?** Não. Eles trabalham e lançam notas no Moodle. Só quem dispara a sincronização ou importa as notas oficiais precisa do SUAP.
- **Boas práticas**:
  - Não cadastrar usuários manualmente no Moodle (a próxima sincronização pode reverter).
  - Implantar os serviços da suíte em contêineres.
  - Temas: o Tema 2023 está obsoleto e deve ser desativado; o Tema 2025 é estável; o Tema 2026 está em desenvolvimento, seguindo a identidade visual do governo federal.
  - O plugin `auth_suap` é opcional, mas recomendado (ver [SSO do Moodle com o SUAP](sso-moodle-auth-suap.md)).
  - Manter 1 diário = 1 sala, 1 matrícula = 1 usuário, 1 inscrição = 1 inscrição na sala. Não juntar vários diários em uma sala, pois isso quebra a sincronização de notas.
- **Há interface da integração?** Não; é comunicação de servidor para servidor entre SUAP, Integrador e Moodle.

## Quando escalar

- Sala criada no Moodle errado ou ambiente incorreto: TIC (expressão seletora do Integrador).
- Erros persistentes ao sincronizar diário ou notas com a configuração conferida: TIC/AVA.
- Divergência de matrícula ou nota que a ressincronização não corrija: Secretaria e TIC em conjunto.
- Diário que não oferece a opção de integração: coordenação de curso e TIC (matriz curricular).

## Equipe responsável

Secretaria acadêmica (habilitação no SUAP), docentes (sincronização e livro de notas) e equipe de TIC/AVA (Integrador e Moodle).

## Links oficiais

- [Site oficial da suíte SUAP-AVA](https://suap-ava-suite.github.io/)
- [SUAP](https://suap.ifrn.edu.br)
- [Integração SUAP–Moodle: visão geral](integracao-suap-moodle-visao-geral.md)
- [SSO do Moodle com o SUAP](sso-moodle-auth-suap.md)

## Nível de confiabilidade

Prático.

## Notas adicionais

- Nomes dos botões podem variar conforme a versão do SUAP (por exemplo, "Sincronizar com o AVA" ou ícone do Moodle).
- Alunos só ficam ativos na sala se estiverem em situação ativa no diário; saídas da lista oficial resultam em suspensão da inscrição.
- Esta página não substitui o Projeto Pedagógico do Curso; apenas garante que as siglas de nota estejam corretas para a importação.
