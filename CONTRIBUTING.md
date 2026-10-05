# Como Contribuir

Este repositório contém a base de conhecimento técnica das equipes de TIC do IFRN. Contribuições são bem-vindas para melhorar a qualidade, atualizar procedimentos e adicionar novos artigos.

## Tipos de contribuição

### 1. Criar novos artigos

Use o template em `templates/artigo.md` para criar artigos sobre:

- Procedimentos de suporte técnico.
- Solução de problemas recorrentes.
- Configuração de sistemas e serviços.
- Migrações de infraestrutura.
- Integrações e APIs.
- Normativos e processos institucionais.

### 2. Atualizar artigos existentes

- Corrigir informações desatualizadas.
- Adicionar novos passos ou exceções identificadas.
- Melhorar clareza e objetividade.
- Atualizar links e referências.

### 3. Revisar artigos

- Validar procedimentos com a equipe responsável.
- Testar passos descritos em ambiente controlado.
- Sugerir melhorias de redação ou estrutura.

## Processo de contribuição

### Passo 1: Fork e branch

1. Faça fork do repositório.
2. Crie uma branch para sua contribuição:
   ```bash
   git checkout -b feature/nome-da-contribuicao
   ```

### Passo 2: Criar ou editar artigo

1. Use o template em `templates/artigo.md`.
2. Preencha todos os campos do frontmatter YAML.
3. Salve o arquivo na pasta apropriada em `docs/`.

### Passo 3: Revisar o conteúdo

Antes de submeter, verifique:

- [ ] O título descreve claramente o conteúdo?
- [ ] As tags são relevantes para busca?
- [ ] O procedimento foi testado ou validado?
- [ ] Os links estão funcionando?
- [ ] O nível de confiabilidade está correto?
- [ ] Não há informações sensíveis (senhas, IPs internos, nomes de servidores)?

### Passo 4: Commit e push

1. Faça commit com mensagem descritiva:
   ```bash
   git commit -m "Adiciona artigo sobre configuração de e-mail institucional"
   ```
2. Envie para o repositório:
   ```bash
   git push origin feature/nome-da-contribuicao
   ```

### Passo 5: Pull Request

1. Abra um Pull Request no repositório original.
2. Descreva a contribuição no corpo do PR.
3. Aguarde revisão e aprovação.

## Padrões de redação

### Estrutura do artigo

- Use Markdown para formatação.
- Mantenha títulos e subtítulos claros e objetivos.
- Use listas numeradas para procedimentos sequenciais.
- Use listas com bullets para itens não sequenciais.
- Inclua exemplos de código quando aplicável.

### Frontmatter YAML

Todos os artigos devem começar com:

```yaml
---
title: "Título do artigo"
category: "Categoria"
service: "Serviço ou sistema"
audience: ["TIC", "Suporte"]
tags: ["tag1", "tag2", "tag3"]
status: "prático"
last_review: "AAAA-MM-DD"
source: "Fonte do conhecimento"
---
```

### Níveis de confiabilidade

- **Confirmado:** procedimento apoiado por documentação oficial ou validação formal.
- **Prático:** solução testada por técnicos, mas sem documentação oficial.
- **Hipótese:** possibilidade levantada, precisa de validação.
- **Obsoleto:** informação desatualizada, manter apenas para referência histórica.

## O que NÃO incluir

- Senhas ou credenciais de acesso.
- Endereços IP internos ou nomes de servidores não públicos.
- Dados pessoais de servidores ou usuários.
- Links para grupos privados ou documentos restritos.
- Informações sensíveis de segurança.

## Revisão e manutenção

- Artigos devem ser revisados pelo menos uma vez por ano.
- Atualize o campo `last_review` após cada revisão.
- Marque artigos obsoletos com `status: "obsoleto"` e adicione nota explicativa.

## Dúvidas?

Abra uma issue no repositório ou entre em contato com a equipe de TIC.
