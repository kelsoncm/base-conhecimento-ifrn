# Como Contribuir

Este repositório contém a base de conhecimento técnica das equipes de TIC do IFRN. Contribuições são muito bem-vindas para melhorar a qualidade, atualizar procedimentos e adicionar novos artigos.

---

## 🛠️ Tipos de Contribuição

### 1. Criar novos artigos
Use o template em [`templates/artigo.md`](https://github.com/kelsoncm/base-conhecimento-ifrn/blob/main/templates/artigo.md) para registrar:

- Procedimentos de suporte técnico e atendimento.
- Solução de problemas operacionais recorrentes.
- Configuração de sistemas, servidores e ativos de rede.
- Migrações e melhorias de infraestrutura.
- Integrações e consumo de APIs.
- Normativos técnicos e processos institucionais.

### 2. Atualizar artigos existentes
- Corrigir passos ou interfaces desatualizadas.
- Adicionar novos passos, comportamentos ou exceções identificadas.
- Melhorar clareza, formatação e objetividade.
- Atualizar links e referências oficiais.

### 3. Revisar artigos
- Validar procedimentos junto à equipe responsável pelo serviço.
- Testar passos descritos em ambiente de homologação ou laboratório.
- Propor melhorias na redação e estrutura dos tópicos.

---

## 📋 Checklist antes de submeter

Antes de enviar uma contribuição, certifique-se de que:

- [ ] O título descreve claramente o sintoma ou objetivo do artigo.
- [ ] As tags são relevantes para facilitar a busca interna.
- [ ] O procedimento foi testado ou validado em cenário real.
- [ ] Os links de referência estão acessíveis.
- [ ] O nível de confiabilidade (`confirmado`, `prático`, `hipótese`, `obsoleto`) está adequado.
- [ ] **Não há informações sensíveis expostas** (senhas, certificados, IPs internos, dados pessoais LGPD).

---

## 📝 Padrão de Cabeçalho (YAML)

Todos os artigos em formato Markdown devem iniciar com o seguinte cabeçalho de metadados:

```yaml
---
title: "Título claro e objetivo do artigo"
category: "Redes | Infraestrutura | SUAP | Procedimentos | ..."
service: "Nome do serviço ou sistema atendido"
audience: ["TIC", "Suporte"]
tags: ["tag1", "tag2", "tag3"]
status: "prático" # ou confirmado / hipótese / obsoleto
last_review: "AAAA-MM-DD"
source: "Experiências trocadas entre colaboradores"
---
```

---

## 🔒 Diretrizes de Segurança

Para manter a segurança das informações institucionais:
- Nunca publique credenciais ou dados restritos.
- Use placeholders explicativos como `<SEU_USUARIO>`, `192.0.2.1` ou `exemplo.ifrn.edu.br`.
- Caso identifique qualquer dado sensível, consulte a [Política de Segurança](https://github.com/kelsoncm/base-conhecimento-ifrn/blob/main/SECURITY.md).
