---
title: "Como autorizar dispositivos na rede wIFRN-IoT"
category: "Redes"
service: "Wi-Fi"
audience: ["TIC", "Suporte"]
tags: ["wifi", "iot", "dispositivos", "mac", "suap", "firewall"]
reliability: "prático"
last_review: "2026-10-05"
source: "Experiências trocadas entre colaboradores"
---

## Sintoma

Dispositivos IoT (controladores inteligentes, sensores, equipamentos de automação) não conseguem se conectar à rede wIFRN-IoT ou não se comunicam com plataformas externas após a conexão.

## Contexto

A rede wIFRN-IoT requer cadastro prévio do endereço MAC de cada dispositivo e possui restrições de comunicação que podem bloquear o tráfego para plataformas externas.

## Procedimento

### 1. Acessar o formulário de autorização

- Acessar o sistema SUAP no formulário de autorização de dispositivos Wi-Fi.
- URL típica: `https://suap.ifrn.edu.br/admin/integracao_wifi/autorizacaodispositivo/`

### 2. Cadastrar o dispositivo

- Inserir o endereço MAC do dispositivo a ser autorizado.
- Confirmar o cadastro no sistema.

### 3. Obter a senha da rede

- A senha da rede wIFRN-IoT é exibida na página de autorização de dispositivos.
- A senha é compartilhada entre todos os dispositivos autorizados.
- **Atenção:** não divulgar esta senha em documentos públicos ou acessíveis a todos os usuários.

### 4. Configurar o dispositivo

- Conectar o dispositivo à rede wIFRN-IoT utilizando a senha obtida.
- O dispositivo só conseguirá se conectar após o cadastro do MAC ser aprovado no sistema.

### 5. Verificar comunicação com plataformas externas

- Caso o dispositivo não consiga se comunicar com a plataforma externa (ex: nuvem, aplicativo móvel), investigar bloqueios no firewall.
- Consultar os logs do Firewall para identificar portas ou domínios bloqueados.
- Portas comuns para dispositivos IoT: 8883–8886 (MQTT), mas verificar a documentação específica do fabricante.

### 6. Criar regra de exceção no firewall (se necessário)

- Após identificar o tráfego bloqueado, solicitar a criação de regra de exceção no firewall.
- Documentar a justificativa técnica e a aplicação específica que requer a exceção.

## Quando escalar

- Quando o dispositivo não conseguir se conectar mesmo após o cadastro.
- Quando houver bloqueio de tráfego para plataformas externas.
- Quando múltiplos dispositivos do mesmo tipo apresentarem o mesmo problema.

## Equipe responsável

COTIC do campus e equipe de segurança de rede (firewall).

## Links oficiais

- [Autorizações de dispositivos no SUAP](https://suap.ifrn.edu.br/admin/integracao_wifi/autorizacaodispositivo/)

## Nível de confiabilidade

Prático.

## Notas adicionais

- A senha da rede wIFRN-IoT pode ser a mesma para todos os dispositivos, mas o acesso depende do cadastro individual pelo MAC.
- Alguns dispositivos podem demorar para ativar a conexão após o cadastro.
- Dispositivos que dependem de comunicação com plataformas externas podem requerer regras específicas no firewall.
- Este procedimento não se aplica a redes wIFRN-Corp ou eduroam.
