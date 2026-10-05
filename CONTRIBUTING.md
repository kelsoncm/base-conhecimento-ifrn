# Como Contribuir

Este repositório reúne anotações técnicas, procedimentos e compartilhamento de conhecimentos pessoais mantidos por Kelson da Costa Medeiros. Contribuições, correções e sugestões de melhoria são muito bem-vindas.

> **Importante:** Este projeto não é uma base oficial do IFRN. Todas as contribuições devem focar em documentação técnica clara, reprodutível e respeitar rigorosamente a segurança da informação e a privacidade.

## Tipos de contribuição

### 1. Criar novos artigos

Use o template em `templates/artigo.md` para criar artigos sobre:

- Procedimentos técnicos e tutoriais passo a passo.
- Solução de problemas operacionais recorrentes (troubleshooting).
- Configuração de sistemas, redes e serviços.
- Migrações e boas práticas de infraestrutura.
- Integrações e APIs.
- Referências normativas e notas técnicas.

### 2. Atualizar artigos existentes

- Corrigir comandos ou informações desatualizadas.
- Adicionar novos passos, cenários alternativos ou exceções identificadas.
- Melhorar a clareza, formatação e didática do texto.
- Atualizar links e referências externas.

### 3. Revisar artigos

- Validar procedimentos em ambiente de laboratório/teste.
- Testar passos descritos antes da aplicação em produção.
- Sugerir melhorias de redação, taxonomia ou estrutura.

## Processo de contribuição

### Passo 1: Fork e branch

1. Faça fork do repositório.
2. Crie uma branch para sua contribuição:
   ```bash
   git checkout -b feature/nome-da-contribuicao
   ```

### Passo 2: Criar ou editar artigo

1. Use o template em `templates/artigo.md`.
2. Preencha todos os campos do frontmatter YAML (incluindo `reliability: "prático"` ou nível adequado).
3. Salve o arquivo na pasta apropriada em `docs/ifrn/` (ou crie uma nova pasta temática se for outro assunto).

### Passo 3: Revisar o conteúdo

Antes de submeter, verifique:

- [ ] O título descreve claramente o conteúdo?
- [ ] As tags são relevantes para busca?
- [ ] O procedimento foi testado ou validado em laboratório?
- [ ] Os links estão funcionando e apontando para destinos válidos?
- [ ] O nível de confiabilidade (`reliability`) está preenchido corretamente?
- [ ] Não há informações sensíveis (senhas, IPs internos reais, dados pessoais LGPD)?

### Passo 4: Commit e push

1. Faça commit com mensagem descritiva no padrão convencional:
   ```bash
   git commit -m "docs(ifrn/suap): [ADD] Adiciona notas sobre configuracao de e-mail"
   ```
2. Envie para o seu fork:
   ```bash
   git push origin feature/nome-da-contribuicao
   ```

### Passo 5: Pull Request

1. Abra um Pull Request no repositório original.
2. Descreva detalhadamente a motivação e as alterações realizadas.
3. Aguarde revisão e aprovação.

## Padrões de redação

### Estrutura do artigo

- Use Markdown para formatação.
- Mantenha títulos e subtítulos claros e objetivos.
- Use listas numeradas para procedimentos sequenciais.
- Use listas com marcadores para itens conceituais ou não ordenados.
- Inclua blocos de código com destaque de sintaxe quando aplicável.

### Frontmatter YAML

Todos os artigos devem começar com:

```yaml
---
title: "Título do artigo"
category: "Categoria"
service: "Serviço ou sistema"
audience: ["TIC", "Suporte"]
tags: ["tag1", "tag2", "tag3"]
reliability: "prático"
last_review: "AAAA-MM-DD"
source: "Fonte do conhecimento"
---
```

### Níveis de confiabilidade

- **Confirmado:** procedimento validado e apoiado por documentação oficial institucional ou pela equipe técnica.
- **Prático:** solução testada em campo por técnicos, mas ainda sem documentação formal.
- **Hipótese:** possibilidade técnica levantada durante diagnóstico, pendente de validação.
- **Obsoleto:** informação desatualizada ou relativa a versões legadas, mantida apenas para referência histórica.

## O que NÃO incluir

- Senhas, credenciais de acesso, tokens ou chaves de API.
- Endereços IP internos reais ou nomes de servidores internos privados.
- Dados pessoais de servidores, alunos ou terceiros (em conformidade com a LGPD).
- Links para grupos privados ou documentos confidenciais restritos.
- Qualquer informação que possa comprometer a segurança da infraestrutura.

## Revisão e manutenção

- Artigos devem ser revisados periodicamente.
- Atualize o campo `last_review` após cada revisão.
- Marque artigos obsoletos com `reliability: "obsoleto"` e adicione nota explicativa.

## Dúvidas?

Abra uma issue no repositório ou entre em contato com o mantenedor.
