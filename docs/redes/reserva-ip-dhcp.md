---
title: "Reserva de IP fixo via DHCP para dispositivos"
category: "Redes"
service: "DHCP"
audience: ["TIC", "Administradores de Rede"]
tags: ["dhcp", "ip", "reserva", "dispositivos", "rede", "iot"]
status: "prático"
last_review: "2026-10-05"
source: "Experiências trocadas entre colaboradores"
---

## Sintoma

Necessidade de atribuir IP fixo a dispositivos específicos (impressoras, servidores, equipamentos IoT) sem configurar manualmente cada equipamento.

## Contexto

A reserva de IP via DHCP permite que dispositivos recebam sempre o mesmo endereço IP baseado no endereço MAC, combinando a conveniência do DHCP com a previsibilidade de IPs fixos.

## Procedimento

### 1. Identificar o dispositivo

- Anotar o endereço MAC do dispositivo.
- Identificar a interface de rede correta (alguns dispositivos têm múltiplas interfaces).

### 2. Acessar o servidor DHCP

- Acessar interface de gerenciamento do servidor DHCP.
- Pode ser:
  - Servidor Windows (DHCP Server).
  - Servidor Linux (isc-dhcp-server, dnsmasq).
  - Roteador/firewall (Firewall, Mikrotik, etc.).

### 3. Criar reserva de IP

#### Em servidores Windows

1. Abrir console do DHCP.
2. Expandir o escopo desejado.
3. Clicar com botão direito em "Reservas".
4. Selecionar "Nova reserva".
5. Preencher:
   - **Nome:** identificação do dispositivo.
   - **IP:** endereço IP desejado.
   - **MAC:** endereço MAC do dispositivo.
   - **Descrição:** informações adicionais (opcional).
6. Clicar em "Adicionar".

#### Em servidores Linux (isc-dhcp-server)

1. Editar arquivo de configuração `/etc/dhcp/dhcpd.conf`.
2. Adicionar bloco de host:
   ```
   host nome-do-dispositivo {
     hardware ethernet 00:11:22:33:44:55;
     fixed-address 192.168.1.100;
   }
   ```
3. Reiniciar serviço DHCP:
   ```bash
   sudo systemctl restart isc-dhcp-server
   ```

#### Em firewalls (Palo Alto, Mikrotik, etc.)

1. Acessar interface web do equipamento.
2. Navegar até configurações de DHCP.
3. Adicionar reserva de IP baseada em MAC.
4. Salvar configurações.

### 4. Validar a configuração

- Reiniciar o dispositivo ou forçar renovação de DHCP.
- Verificar se o IP atribuído corresponde ao reservado.
- Testar conectividade e acesso ao dispositivo.

### 5. Documentar a reserva

- Manter planilha ou sistema com:
  - Nome do dispositivo.
  - Endereço MAC.
  - IP reservado.
  - Localização física.
  - Responsável pelo dispositivo.

## Quando escalar

- Quando não houver acesso ao servidor DHCP.
- Quando a reserva não funcionar após configuração.
- Quando múltiplos dispositivos apresentarem conflito de IP.

## Equipe responsável

Administradores de rede de cada campus.

## Links oficiais

- [Documentação isc-dhcp-server](https://www.isc.org/dhcp/)
- [Documentação Microsoft DHCP](https://docs.microsoft.com/en-us/windows-server/networking/technologies/dhcp/dhcp-top)

## Nível de confiabilidade

Prático.

## Notas adicionais

- A reserva de IP é diferente de configurar IP fixo manualmente no dispositivo.
- O dispositivo deve estar configurado para obter IP via DHCP.
- A reserva garante que o mesmo IP será atribuído sempre que o dispositivo solicitar.
- É útil para dispositivos que precisam de IP previsível mas não suportam configuração manual.
- Em ambientes com múltiplos servidores DHCP, garantir que apenas um esteja ativo para o escopo.
