---
title: "PGD e RSC - Preenchimento de tempo, fração de hora e designações"
category: "SUAP"
service: "PGD/RSC"
audience: ["TIC", "TAEs", "Gestão"]
tags: ["pgd", "rsc", "tempo", "hora", "designação", "pontuação"]
reliability: "prático"
last_review: "2026-10-05"
source: "Experiências trocadas entre colaboradores"
---

## Sintoma

Servidores têm dúvidas sobre como preencher tempo no PGD, especialmente sobre fração de hora vs minutos, e como funcionam designações para RSC.

## Contexto

O PGD usa fração de hora (decimal) em vez de minutos, o que causa confusão inicial. O RSC tem regras específicas para contagem de tempo por designação.

## Procedimento

### 1. Entender fração de hora no PGD

- **Depois da vírgula é fração de hora, não minuto.**
- Exemplos:
  - `1,50` = 1 hora e 50% = 1h30min
  - `0,50` = 50% de 1 hora = 30 minutos
  - `1,30` = 1 hora e 30% = 1h18min (não 1h30!)
  - `0,25` = 25% de 1 hora = 15 minutos
  - `1,00` = 1 hora completa

### 2. Converter minutos para fração

- **Fórmula:** `fração = minutos / 60`
- Exemplos:
  - 30 min = 30/60 = 0,50
  - 15 min = 15/60 = 0,25
  - 45 min = 45/60 = 0,75
  - 90 min = 90/60 = 1,50

### 3. Regras de pontuação RSC

#### Tempo por designação

- Menor que 6 meses = 0 pontos
- 6 meses ou mais (até 1 ano) = 1 ponto
- 1 ano e 7 meses = 2 pontos
- Fração acima de 6 meses conta como ano completo

#### Designações múltiplas

- Cada designação é contada separadamente.
- Dois projetos de 3 meses cada = 2 designações de 3 meses (não soma para 6 meses).
- Projetos por tempo vs designação têm regras diferentes.

### 4. Dicas de preenchimento

- Acostumar-se com a lógica decimal leva tempo.
- Usar calculadora ou planilha para conversão inicial.
- Revisar entregas antes de submeter.
- Documentar horas trabalhadas em planilha paralela.

## Quando escalar

- Quando houver dúvidas sobre enquadramento de atividades.
- Quando o sistema apresentar comportamento inesperado.
- Quando precisar de orientação sobre documentação comprobatória.

## Equipe responsável

DIGPE (Diretoria de Gestão de Pessoas) e comissão RSC.

## Nível de confiabilidade

Confirmado.

## Notas adicionais

- A lógica decimal é estranha no início, mas funciona após acostumar.
- É fortemente recomendado abrir processo administrativo para garantir marco temporal.
- Documentos podem ser encontrados no assentamento funcional digital (Sou Gov).
- Boletins de serviço dos campi estão disponíveis no portal antigo (portal2.ifrn.edu.br).
