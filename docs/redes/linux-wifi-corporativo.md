---
title: "Linux - Configuração de Wi-Fi corporativo (eduroam e wIFRN-Corp)"
category: "Redes"
service: "Wi-Fi"
audience: ["TIC", "Usuários Linux"]
tags: ["linux", "wifi", "eduroam", "wifrn-corp", "certificado", "ubuntu"]
status: "prático"
last_review: "2026-10-05"
source: "Experiências trocadas entre colaboradores"
---

## Sintoma

Usuários de Linux (Ubuntu, Fedora, etc.) têm dificuldade para conectar às redes eduroam ou wIFRN-Corp, especialmente com autenticação por certificado.

## Contexto

Linux requer configuração manual de certificados e parâmetros de autenticação para redes WPA2-Enterprise. O botão "Conectar" pode não habilitar sem configurações específicas.

## Procedimento

### 1. Configurar conexão eduroam/wIFRN-Corp

#### Ubuntu (Network Manager)

1. Abrir configurações de rede.
2. Adicionar nova conexão Wi-Fi.
3. Selecionar SSID (eduroam ou wIFRN-Corp).
4. Configurar segurança:
   - **Tipo:** WPA & WPA2 Enterprise
   - **Autenticação:** PEAP
   - **Usuário:** matrícula (adicionar `@ifrn.edu.br` se necessário)
   - **Senha:** senha do SUAP
   - **Certificado CA:** Nenhum certificado necessário (ou "Confiar no primeiro uso")
   - **Domínio:** `ifrn.local` (para wIFRN-Corp) ou `ifrn.edu.br` (para eduroam externa)

#### Fedora/RHEL

1. Usar `nm-connection-editor` ou configurações de rede.
2. Seguir passos similares ao Ubuntu.
3. Pode requerer instalação de pacotes adicionais:
   ```bash
   sudo dnf install NetworkManager NetworkManager-wifi
   ```

### 2. Problemas comuns

#### Botão "Conectar" não habilita

- **Solução:** Marcar opção "Nenhum certificado necessário" ou "Confiar no primeiro uso".
- Isso habilita o botão para prosseguir.

#### Conexão fica pedindo senha repetidamente

- Verificar se o domínio está correto.
- Para wIFRN-Corp: usar `ifrn.local`.
- Para eduroam em outras instituições: usar `ifrn.edu.br`.

#### Certificado não funciona

- Remover certificado e tentar sem.
- Usar opção "Confiar no primeiro uso".
- Verificar se o certificado CA está instalado no sistema.

### 3. Configurações específicas por distribuição

#### Ubuntu 20.04+

- Network Manager já inclui suporte a WPA2-Enterprise.
- Pode requerer desabilitar verificação de certificado.

#### Fedora 30+

- Pode requerer configuração manual via terminal.
- Usar `nmcli` para criar conexão:
  ```bash
  nmcli con add type wifi ssid eduroam     wifi-sec.key-mgmt wpa-eap     802-1x.eap peap     802-1x.identity "matricula"     802-1x.password "senha"
  ```

#### Arch Linux/Manjaro

- Usar `netctl` ou Network Manager.
- Configurar `wpa_supplicant` manualmente se necessário.

### 4. Testar conexão

1. Conectar à rede.
2. Abrir navegador e testar acesso.
3. Verificar se DNS está resolvendo corretamente.
4. Se não navegar, verificar configurações de DNS.

## Quando escalar

- Quando a conexão não estabelecer após todas as tentativas.
- Quando múltiplos usuários Linux relatarem o mesmo problema.
- Quando houver mudança nos parâmetros de autenticação.

## Equipe responsável

COTIC do campus.

## Nível de confiabilidade

Prático.

## Notas adicionais

- O domínio `ifrn.local` é específico para rede interna.
- Para eduroam em outras instituições, usar `ifrn.edu.br`.
- A opção "nenhum certificado necessário" é segura para redes internas confiáveis.
- Configurações podem variar conforme versão do Network Manager.
