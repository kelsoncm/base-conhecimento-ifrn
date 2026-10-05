---
title: "Solução de problemas de conexão à eduroam e wIFRN-Corp"
category: "Redes"
service: "Wi-Fi"
audience: ["TIC", "Suporte"]
tags: ["wifi", "eduroam", "wifrn-corp", "dns", "windows", "drivers", "android"]
reliability: "prático"
last_review: "2026-10-05"
source: "Experiências trocadas entre colaboradores"
---

## Sintoma

Usuários relatam dificuldade para conectar às redes eduroam ou wIFRN-Corp em dispositivos móveis (Android, iOS) e computadores (Windows, Linux).

## Contexto

Problemas recorrentes associados a configurações de DNS, drivers desatualizados, perfis de rede antigos e limitações específicas de sistemas operacionais.

## Procedimento

### 1. Verificar configuração de DNS

- Em dispositivos Android, desativar o **DNS privado** ou **DNS personalizado** nas configurações de conectividade.
- O Firewall bloqueia o uso de servidores DNS alternativos, o que impede a resolução de nomes internos necessários para autenticação.
- A autenticação na rede depende da resolução de nomes de servidores internos.

### 2. Atualizar drivers de rede

- Em computadores Windows, especialmente Windows 11, atualizar o driver da placa de rede via Windows Update ou site do fabricante.
- Cerca de 90% dos problemas de conexão estão relacionados a drivers desatualizados ou genéricos.

### 3. Remover perfis antigos da rede

- Excluir perfis de rede salvos anteriormente e recriar a conexão do zero.
- No Windows, verificar o registro em `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\NetworkList\Profiles`.

### 4. Verificar suporte a WPA2-Enterprise

- Confirmar se o dispositivo suporta redes WPA2-Enterprise.
- Em versões Home do Windows, a limitação principal está relacionada ao ingresso no domínio, não necessariamente à conexão Wi-Fi.

### 5. Credential Guard no Windows 11 Home

- O Credential Guard pode vir ativado por padrão no Windows 11 Home e quebrar a autenticação PEAP.
- Solução: mudar para autenticação por certificado ou criar o perfil manualmente sem validação.

### 6. Reiniciar configurações de rede

- Em casos persistentes, reiniciar as configurações de rede do dispositivo.
- Considerar que o problema pode estar relacionado a software de terceiros alterando configurações de DNS.

## Quando escalar

- Quando o problema persistir após todos os passos acima.
- Quando houver suspeita de bloqueio no firewall ou problema com o servidor de autenticação.
- Quando múltiplos usuários de um mesmo campus relatarem o problema simultaneamente.

## Equipe responsável

COTIC do campus.

## Links oficiais

- [Manual de configuração Wi-Fi IFRN](https://wifi.ifrn.edu.br)
- [Manuais e guias de configuração](https://portal.ifrn.edu.br/campus/sao-paulo-do-potengi/o-campus/direcao-geral/tecnologia-da-informacao/manuais/)

## Nível de confiabilidade

Prático.

## Notas adicionais

- O uso de DNS customizado pode impedir a autenticação em redes internas, mesmo que funcione para eduroam.
- A autenticação PEAP requer resolução de nomes internos para localizar o servidor de autenticação do AD.
- Problemas intermitentes podem estar relacionados a deploy do SUAP ou reinicialização de serviços de autenticação.
