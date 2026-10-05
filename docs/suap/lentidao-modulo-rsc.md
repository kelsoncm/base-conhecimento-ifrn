---
title: "Diagnóstico de lentidão no SUAP em períodos de alta demanda"
category: "SUAP"
service: "Sistema Unificado de Administração Pública"
audience: ["TIC", "Suporte", "Gestão"]
tags: ["suap", "desempenho", "rsc", "pdf", "workers", "monitoramento"]
status: "prático"
last_review: "2026-10-05"
source: "Experiências trocadas entre colaboradores"
---

## Sintoma

Usuários relatam lentidão no acesso ao SUAP, especialmente durante períodos de alta demanda (ex: lançamento de notas, módulo de RSC-TAE, fim de semestre letivo).

## Contexto

O SUAP pode apresentar degradação de desempenho devido ao aumento simultâneo de acessos, processamento de PDFs, upload de documentos e tarefas assíncronas.

## Procedimento

### 1. Confirmar a extensão do problema

- Verificar se o problema é geral (todos os campi) ou restrito a um campus específico.
- Consultar outros canais de comunicação para confirmar se há relatos similares.

### 2. Consultar monitoramento de infraestrutura

- Verificar uso de CPU, memória, disco e rede nos servidores web, banco de dados, cache e filas.
- Analisar a quantidade de workers web ativos e o tempo de resposta das requisições.
- Identificar processos com alto consumo de recursos (ex: geração de PDF, tarefas assíncronas).

### 3. Identificar causas prováveis

- Aumento de acessos devido a módulos específicos (ex: RSC-TAE).
- Upload e assinatura de PDFs dos memoriais.
- Exportação de documentos pelos usuários.
- Processamento eletrônico de processos.
- Fim de semestre letivo e lançamento de notas.

### 4. Comunicar oficialmente a situação

- Enviar comunicado aos usuários explicando o cenário e solicitando paciência.
- Informar que a equipe técnica está trabalhando para resolver o problema.
- Evitar que usuários abram múltiplos chamados para o mesmo problema.

### 5. Ajustar infraestrutura (se possível)

- Otimizar configuração dos servidores web e workers.
- Balancear carga entre servidores disponíveis.
- Priorizar tarefas críticas e adiar processamentos não essenciais.

### 6. Registrar o incidente

- Documentar o incidente, incluindo:
  - Data e horário de início e fim.
  - Causa identificada.
  - Ações tomadas.
  - Impacto nos usuários.
- Usar o registro para planejamento de capacidade futura.

## Quando escalar

- Quando o problema persistir por mais de 2 horas.
- Quando houver indisponibilidade total do sistema.
- Quando ajustes de infraestrutura não forem suficientes.

## Equipe responsável

Equipe de infraestrutura e desenvolvimento do SUAP (DINRE/DITIC).

## Links oficiais

- [Central de Serviços do SUAP](https://suap.ifrn.edu.br/centralservicos/)

## Nível de confiabilidade

Prático.

## Notas adicionais

- O SUAP pode ficar lento mas não cair completamente durante picos de demanda.
- Processos eletrônicos são particularmente pesados devido à geração e assinatura de PDFs.
- A comunicação oficial ajuda a reduzir o volume de chamados e a ansiedade dos usuários.
- O problema tende a se resolver após o pico de demanda passar.
