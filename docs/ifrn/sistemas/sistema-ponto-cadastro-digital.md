---
title: "Sistema de ponto - Cadastro de digital e troubleshooting"
category: "Sistemas"
service: "Ponto Eletrônico"
audience: ["TIC", "COGPE", "Servidores"]
tags: ["ponto", "digital", "biometria", "suap", "terminal", "cadastro"]
reliability: "prático"
last_review: "2026-10-05"
source: "Experiências trocadas entre colaboradores"
---

## Sintoma

Servidores cadastram digital no SUAP mas o terminal de ponto não reconhece a biometria, ou há demora na sincronização.

## Contexto

O sistema de ponto do SUAP requer cadastro de digital e sincronização com terminais físicos. Problemas de sincronização e reconhecimento são comuns.

## Procedimento

### 1. Cadastro de digital

1. Acessar SUAP.
2. Navegar até seção de ponto eletrônico.
3. Cadastrar digital conforme procedimento padrão.
4. Aguardar confirmação de cadastro no sistema.

### 2. Sincronização com terminal

- Após cadastro, o terminal precisa importar os dados.
- Pode haver demora de sincronização (até 24 horas).
- Se o terminal não reconhecer:
  - Verificar se a digital foi importada no terminal.
  - Tentar novamente no dia seguinte.
  - Justificar ponto manualmente até normalizar.

### 3. Problemas comuns

#### Digital cadastrada mas terminal não reconhece

- **Causa provável:** Demora na sincronização.
- **Solução:** Aguardar até o dia seguinte.
- **Alternativa:** Justificar ponto manualmente no período.

#### Terminal não importa dados

- Verificar conexão do terminal com a rede.
- Reiniciar o terminal.
- Verificar se há atualizações pendentes.

#### Servidores substitutos com dificuldade

- Professores substitutos podem ter problemas de autenticação no webmail e ponto.
- São necessários ajustes de cadastro pela DINRE.
- Abrir chamado relatando o problema.

### 4. Procedimento para novos servidores

1. Cadastrar digital no SUAP.
2. Justificar ponto manualmente até o dia do cadastro.
3. A partir do dia seguinte, registrar normalmente no terminal.
4. Se persistir problema, abrir chamado.

### 5. Instalação do sistema de ponto

- **Versão anterior:** 32 bits.
- **Versão atual:** 64 bits (restrição do SO, não do software).
- **Linux 32 bits:** Deve funcionar.
- **Distro recomendada:** Começar com Ubuntu 14.04.1 LTS (compatibilidade), depois migrar para LTS mais recente (segurança).

## Quando escalar

- Quando o problema persistir por mais de 2 dias.
- Quando múltiplos servidores apresentarem o mesmo problema.
- Quando houver falha generalizada do sistema.

## Equipe responsável

DINRE e COGPE de cada campus.

## Nível de confiabilidade

Prático.

## Notas adicionais

- Problemas de sincronização são comuns e normalmente se resolvem em 24h.
- É importante orientar servidores a justificar ponto manualmente enquanto aguardam sincronização.
- Terminais de refeitório podem apresentar problemas similares.
