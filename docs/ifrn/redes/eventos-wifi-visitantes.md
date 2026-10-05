---
title: "Eventos e Wi-Fi para visitantes - Uso da rede wIFRN-Visitantes com GOV.BR"
category: "Redes"
service: "Wi-Fi"
audience: ["TIC", "Eventos", "Visitantes"]
tags: ["wifi", "visitantes", "eventos", "gov.br", "wifrn-visitantes", "senha"]
reliability: "prático"
last_review: "2026-10-05"
source: "Experiências trocadas entre colaboradores"
---

## Sintoma

Campi realizam eventos com participantes externos e precisam fornecer acesso Wi-Fi, mas têm dúvidas sobre como configurar (rede aberta vs senha, GOV.BR, etc.).

## Contexto

A rede wIFRN-Visitantes requer autenticação via GOV.BR. Alguns campi mantêm senha adicional para evitar uso indevido por pessoas das proximidades.

## Procedimento

### 1. Opções para eventos

#### Opção A: wIFRN-Visitantes com GOV.BR (padrão)

- Visitantes se cadastram via GOV.BR.
- Após login, têm acesso à internet.
- **Vantagem:** Autenticação individual, rastreável.
- **Desvantagem:** Requer que visitantes tenham conta GOV.BR.

#### Opção B: Rede aberta para evento (temporária)

- Criar SSID temporário para o evento.
- Sem senha ou senha simples.
- **Vantagem:** Fácil acesso para participantes.
- **Desvantagem:** Menos segurança, uso indiscriminado.

#### Opção C: Manter senha na wIFRN-Visitantes

- Alguns campi mantêm senha adicional.
- Visitantes precisam da senha para conectar.
- **Vantagem:** Evita uso por pessoas externas ao evento.
- **Desvantagem:** Etapa adicional para visitantes.

### 2. Configuração recomendada para eventos

1. **Antes do evento:**
   - Verificar capacidade da rede para número esperado de participantes.
   - Preparar instruções de acesso (QR Code, instruções impressas).
   - Testar autenticação GOV.BR.

2. **Durante o evento:**
   - Ter equipe de suporte para auxiliar com conexão.
   - Monitorar uso da rede.
   - Estar preparado para problemas de autenticação.

3. **Após o evento:**
   - Verificar se não há configurações temporárias ativas.
   - Documentar problemas ocorridos para melhoria.

### 3. Problemas comuns

#### Visitante não consegue gerar código GOV.BR

- **Problema:** App GOV.BR requer internet para gerar código, mas visitante está sem internet.
- **Solução:** Usar hotspot móvel temporário ou conectar primeiro sem autenticação para gerar código.

#### Pessoas das proximidades usando a rede

- **Causa:** Rede aberta ou senha vazada.
- **Solução:** Manter senha adicional ou limitar horário de acesso.
- **Histórico:** Alguns campi tiveram casos de pessoas usando a rede da rua (ex: em cima de caminhonete).

#### Rede lenta durante evento

- **Causa:** Muitos usuários simultâneos.
- **Solução:** Monitorar capacidade, considerar rede temporária adicional.

### 4. Exemplo de instruções para visitantes

```
Como se conectar ao Wi-Fi do evento:

1. Selecione a rede "wIFRN-Visitantes"
2. Abra o navegador (se não abrir automaticamente)
3. Faça login com sua conta GOV.BR
4. Após autenticação, você terá acesso à internet

Dúvidas? Procure a equipe de suporte no local.
```

## Quando escalar

- Quando o número de visitantes exceder a capacidade da rede.
- Quando houver problemas recorrentes de autenticação.
- Quando for necessário criar infraestrutura temporária específica.

## Equipe responsável

COTIC do campus e equipe de eventos.

## Nível de confiabilidade

Prático.

## Notas adicionais

- A senha na rede visitantes foi implementada devido a casos de uso indevido.
- Alguns campi consideram remover senha para eventos específicos.
- É possível criar regra no firewall liberando apenas GOV.BR para usuários não autenticados.
- Documentar procedimento para replicar em eventos futuros.
