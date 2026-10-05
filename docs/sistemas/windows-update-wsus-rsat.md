---
title: "Windows Update e WSUS - Instalação de RSAT e Features on Demand"
category: "Infraestrutura"
service: "Windows"
audience: ["TIC", "Suporte", "Administradores"]
tags: ["windows", "wsus", "update", "rsat", "features on demand", "ferramentas administrativas"]
status: "prático"
last_review: "2026-10-05"
source: "Experiências trocadas entre colaboradores"
---

## Sintoma

Administradores tentam instalar Ferramentas Administrativas (RSAT) ou recursos opcionais no Windows 10/11 e o Windows Update não funciona ou não encontra os pacotes.

## Contexto

A instituição possui servidor WSUS (Windows Server Update Services) interno para gerenciar atualizações. O WSUS não fornece recursos opcionais como RSAT, que precisam ser obtidos via Features on Demand (FOD).

## Procedimento

### 1. Verificar se o problema é WSUS

- Se o Windows Update não baixa recursos opcionais, provavelmente está usando o WSUS interno.
- O WSUS fornece apenas atualizações de segurança e críticas, não recursos opcionais.

### 2. Opção A: Usar Features on Demand (FOD)

1. Acessar o VLSC (Volume Licensing Service Center).
2. Baixar a ISO do Features on Demand.
3. Montar a ISO na máquina alvo.
4. Instalar as ferramentas administrativas desejadas.
5. **Atenção:** verificar se a ISO está atualizada.

### 3. Opção B: Configurar Windows para usar Microsoft Update

1. Abrir Editor de Política de Grupo (gpedit.msc).
2. Navegar até:
   ```
   Configuração do Computador > Modelos Administrativos > Sistema
   ```
3. Localizar política:
   ```
   "Não usar servidor do Windows Update..."
   ```
4. Desabilitar esta política temporariamente.
5. Executar Windows Update para instalar RSAT.
6. Reabilitar a política após a instalação.

### 4. Opção C: Usar comando DISM

1. Abrir PowerShell como Administrador.
2. Executar comando para listar recursos disponíveis:
   ```powershell
   DISM /Online /Get-Capabilities
   ```
3. Instalar RSAT específico:
   ```powershell
   DISM /Online /Add-Capability /CapabilityName:Rsat.ActiveDirectory.DS-LDS.Tools~~~~0.0.1.0
   ```
4. Substituir o nome do capability conforme a ferramenta desejada.

### 5. Ferramentas RSAT disponíveis

- Active Directory (RSAT-AD-Tools)
- DNS (RSAT-DNS-Server)
- DHCP (RSAT-DHCP)
- Group Policy (RSAT-GroupPolicy-Management)
- Hyper-V (RSAT-Hyper-V-Tools)
- E outras...

### 6. Validar instalação

- Abrir "Recursos ou Funcionalidades do Windows".
- Verificar se as ferramentas administrativas aparecem listadas.
- Testar abertura das ferramentas (ex: Usuários e Computadores do Active Directory).

## Quando escalar

- Quando a instalação falhar repetidamente.
- Quando não houver acesso ao VLSC ou ISO FOD.
- Quando múltiplas máquinas apresentarem o mesmo problema.

## Equipe responsável

Administradores de sistemas Windows de cada campus.

## Links oficiais

- [Documentação Microsoft RSAT](https://docs.microsoft.com/en-us/windows-server/administration/rsat/rsat-overview)
- [Base de Conhecimento SUAP](https://suap.ifrn.edu.br/centralservicos/baseconhecimento/1854/)

## Nível de confiabilidade

Prático.

## Notas adicionais

- O WSUS é útil para controle de atualizações, mas limita instalação de recursos opcionais.
- Features on Demand requer ISO específica, que pode estar desatualizada.
- Em ambiente corporativo, equilibrar segurança (WSUS) com funcionalidade (FOD) é um desafio comum.
