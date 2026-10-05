---
title: "Migração de infraestrutura VMware para Proxmox com backup automatizado"
category: "Infraestrutura"
service: "Virtualização"
audience: ["TIC", "Administradores de Sistema"]
tags: ["proxmox", "vmware", "backup", "virtualização", "hypervisor", "pbs"]
reliability: "prático"
last_review: "2026-10-05"
source: "Experiências trocadas entre colaboradores"
---

## Sintoma

Instituição utiliza VMware com limitações de licença, sem backup automatizado e com subutilização de hardware.

## Contexto

Migração de infraestrutura de virtualização VMware para Proxmox VE, com implementação de backup automatizado usando Proxmox Backup Server (PBS), visando:

- Utilizar todo o hardware disponível (processadores, RAM, armazenamento).
- Eliminar limitações de licença do VMware.
- Implementar backup automatizado de VMs.
- Agilizar restauração de serviços após falhas ou desastres.

## Procedimento

### 1. Planejamento

- Inventariar VMs existentes no VMware.
- Documentar configurações de cada VM (CPU, RAM, disco, rede).
- Identificar serviços críticos e priorizar ordem de migração.
- Planejar janela de manutenção para cada etapa.

### 2. Preparar servidor temporário

- Montar um servidor temporário com hardware disponível.
- Instalar o Proxmox VE no servidor temporário.
- Configurar rede e armazenamento.

### 3. Implementar Proxmox Backup Server

- Criar uma VM para o Proxmox Backup Server (PBS).
- Configurar repositórios de backup.
- Testar backup e restauração de uma VM de teste.

### 4. Migrar VMs existentes

- Exportar VMs do VMware (formato OVF/OVA ou discos virtuais).
- Importar VMs para o Proxmox VE.
- Ajustar configurações de hardware virtual (ex: controladoras de disco, rede).
- Testar cada VM após a migração.

### 5. Exemplo de arquitetura migrada

- 1 VM com 1 TB: FOG (clonagem de máquinas).
- 1 VM com 600 GB: Arquivos e impressão.
- 1 VM com 40 GB: DHCP.
- 1 VM para Proxmox Backup Server.

### 6. Substituir servidor antigo

- Formatrar o servidor antigo.
- Instalar Proxmox VE + Proxmox Backup Server.
- Migrar VMs do servidor temporário para o servidor definitivo.
- Configurar backup automatizado.

### 7. Considerações de rede

- Em redes com cascateamento de switches, considerar colocar servidor de storage próximo aos laboratórios.
- Evitar que tráfego de clonagem sature links entre switches.
- O servidor principal pode ter placas de rede em ambas as redes (corporativa e acadêmica).
- O storage pode ser separado do servidor de gerenciamento.

### 8. Validar restauração

- Testar restauração de VMs críticas (ex: DHCP, Active Directory).
- Medir tempo de restauração (ex: ~10 minutos para VMs de tamanho médio).
- Documentar procedimento de recuperação de desastres.

## Quando escalar

- Quando houver problemas de compatibilidade de hardware.
- Quando a migração exigir tempo de indisponibilidade não planejado.
- Quando houver falha na restauração de backups.

## Equipe responsável

Administradores de sistema e equipe de infraestrutura de cada campus.

## Links oficiais

- [Proxmox VE](https://www.proxmox.com/en/proxmox-ve)
- [Proxmox Backup Server](https://www.proxmox.com/en/proxmox-backup-server)
- [Artigo no SUAP sobre migração](https://suap.ifrn.edu.br/centralservicos/baseconhecimento/2425/)

## Nível de confiabilidade

Prático.

## Notas adicionais

- A migração exige trabalho significativo, mas evita problemas maiores no futuro.
- É importante documentar testes, dificuldades e resultados.
- O uso de Docker pode facilitar a replicação em alguns cenários.
- A separação entre servidor de gerenciamento e storage pode melhorar performance.
- Backup automatizado é essencial para recuperação de serviços críticos como AD e DHCP.
