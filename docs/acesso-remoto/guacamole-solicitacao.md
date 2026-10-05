---
title: "Guacamole - Solicitação de acesso remoto ao SUAP"
category: "Acesso Remoto"
service: "Guacamole"
audience: ["TIC", "Suporte", "Usuários"]
tags: ["guacamole", "acesso remoto", "suap", "vpn", "trabalho remoto", "proen"]
status: "prático"
last_review: "2026-10-05"
source: "Experiências trocadas entre colaboradores"
---

## Sintoma

Servidores precisam de acesso remoto a sistemas internos (ex: SUAP, Q-Acadêmico) e não sabem como solicitar ou qual procedimento seguir.

## Contexto

O acesso remoto é fornecido via Guacamole (acessoremoto.ifrn.edu.br), não via VPN tradicional. A solicitação deve ser feita através da Central de Serviços do SUAP.

## Procedimento

### 1. Identificar necessidade de acesso

- Servidor precisa acessar sistemas internos fora do campus.
- Exemplos: SUAP, Q-Acadêmico, sistemas administrativos.

### 2. Abrir chamado na Central de Serviços

1. Acessar: `https://suap.ifrn.edu.br/centralservicos/`
2. Fazer login com matrícula e senha.
3. Acessar o serviço [Dúvida na utilização do Q-Acadêmico](https://suap.ifrn.edu.br/centralservicos/abrir_chamado/121/)
4. Descrever a necessidade de acesso remoto.

### 3. Aguardar processamento

- O chamado será direcionado para PROEN (Pró-Reitoria de Ensino).
- A equipe de TI adiciona o servidor ao grupo do AD com permissão.
- O servidor receberá confirmação quando o acesso for liberado.

### 4. Acessar o Guacamole

- URL: `https://acessoremoto.ifrn.edu.br/`
- Usar credenciais do SUAP (matrícula e senha).
- Selecionar o sistema desejado (ex: SUAP, Q-Acadêmico).

### 5. Troubleshooting

#### Chamado vai para PROEN em vez da fila de TI

- Isso é esperado para solicitações de acesso remoto.
- A TI é responsável por adicionar ao grupo do AD após abertura do chamado.

#### Categoria incorreta

- Se não encontrar "Acesso Remoto", usar "Seção de Ensino".
- Descrever claramente que precisa de acesso via Guacamole.

#### Acesso não funciona após liberação

- Verificar se o servidor foi adicionado ao grupo correto do AD.
- Testar acesso em diferentes navegadores.
- Abrir novo chamado relatando o problema.

### 6. Diferença entre VPN e Guacamole

- **VPN:** acesso à rede interna completa (não é mais utilizado para este fim).
- **Guacamole:** acesso remoto a sistemas específicos via navegador (procedimento atual).

## Quando escalar

- Quando o chamado não for atendido em tempo razoável.
- Quando o acesso não funcionar após confirmação de liberação.
- Quando houver dúvidas sobre qual sistema acessar.

## Equipe responsável

PROEN (Pró-Reitoria de Ensino) e equipe de TI/AD.

## Links oficiais

- [Central de Serviços do SUAP](https://suap.ifrn.edu.br/centralservicos/)
- [Guacamole IFRN](https://acessoremoto.ifrn.edu.br/)

## Nível de confiabilidade

Prático.

## Notas adicionais

- O procedimento via Guacamole substituiu o acesso via VPN para a maioria dos casos.
- O grupo do AD é gerenciado pela equipe de TI após abertura do chamado.
- Bibliotecários e outros servidores que precisam acessar SIABI também seguem este procedimento.
- O acesso via Guacamole é mais seguro que VPN tradicional para casos de uso específicos.
