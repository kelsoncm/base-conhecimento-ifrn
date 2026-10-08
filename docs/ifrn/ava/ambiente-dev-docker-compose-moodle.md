---
title: "Ambiente de desenvolvimento local da suíte SUAP-AVA com Docker Compose"
category: "AVA"
service: "AVA Moodle"
audience: ["TIC", "Desenvolvedores"]
tags: ["ava", "moodle", "docker", "docker-compose", "sas", "desenvolvimento", "wsl2", "suap"]
reliability: "prático"
last_review: "2026-10-08"
source: "Documentação do workspace de desenvolvimento da suíte SUAP-AVA e experiências trocadas entre colaboradores"
---

## Sintoma

Desenvolvedores que vão trabalhar nos plugins Moodle e nos serviços de integração da suíte SUAP-AVA precisam de um ambiente local completo (Moodle, banco, integrador, painel) e não sabem como montá-lo ou como resolver os erros mais comuns ao subir os contêineres.

## Contexto

A suíte SUAP-AVA integra sistemas de gestão acadêmica (SUAP, SIGAA, qAcadêmico) ao Moodle, sincronizando turmas, diários, alunos e professores, e devolvendo notas e frequências. O repositório de workspace sobe tudo o que é necessário para desenvolvimento via `docker compose`, com um script de atalhos chamado `sas` (versão bash e versão PowerShell, `sas.ps1`).

Pontos importantes:

- O ambiente é **apenas para desenvolvimento**. Nunca deve ser usado em produção.
- O workspace é privado; os demais projetos da suíte (plugins `local_suap`, `tool_sga`, `tool_painelava`, `auth_suap`, o Painel AVA, o Integrador AVA, o CDN de assets e o meta-pacote Django) ficam lado a lado em uma pasta de projetos.
- A stack usa Git, Python 3.14, PHP 8.3, Docker 27+ com o plugin Compose e Linux (Mac OS ou Windows apenas via WSL2).

## Procedimento

### 1. Pré-requisitos de acesso

1. Cadastro no SUAP.
2. Cadastro no CodeLab do IFRN e inclusão como desenvolvedor nos projetos.
3. Chave SSH pública cadastrada no CodeLab.
4. Conta no GitHub, inclusão como desenvolvedor na organização da suíte e chave SSH pública cadastrada.

### 2. Pré-requisitos de máquina

- Linux (Debian 12/Ubuntu ou AlmaLinux 9), ou Windows com WSL2.
- Instalar `curl`, `git`, `wget`, Python 3 (com `venv`/`pip`) e as bibliotecas de desenvolvimento necessárias.
- Instalar o Docker Engine pelo repositório oficial do Docker (não pelo pacote `docker.io` da distribuição), junto com `docker-buildx-plugin` e `docker-compose-plugin`.
- Adicionar o usuário ao grupo `docker` (`sudo usermod -aG docker $USER`) e abrir uma nova sessão.
- Validar: `docker --version`, `docker compose version` e `docker run --rm hello-world`.

Em **Debian 12**, remova pacotes conflitantes (`docker.io`, `docker-compose`, `podman-docker`, `containerd`, `runc`), adicione a chave GPG e o repositório APT da Docker e instale os pacotes `docker-ce`, `docker-ce-cli`, `containerd.io`, `docker-buildx-plugin` e `docker-compose-plugin`.

Em **AlmaLinux 9**, instale `epel-release`, `curl`, `git`, `wget`, adicione o repositório `docker-ce` (compatível com CentOS) via `yum-config-manager`, instale os mesmos pacotes e execute `sudo systemctl start docker`.

Opcional: `pyenv` para gerenciar versões do Python por projeto (no Alma, exige o grupo "Development Tools" e os pacotes `-devel` de openssl, sqlite, ncurses e readline).

### 3. Editor

O VS Code é o editor padrão do projeto. Extensões úteis: Remote Containers/WSL, Docker, Python (Pylance, debugpy, Black), cliente PostgreSQL, REST Client (para depurar o Integrador e os plugins), Xdebug e Intelephense (PHP), suporte a Mustache e a templates Django.

### 4. Instalação do workspace (Linux/WSL2)

1. Garanta que **nada esteja usando a porta 80** na máquina.
2. Clone o workspace (repositório privado da organização) na pasta de projetos e execute `sas setup`. O comando cria no `/etc/hosts` as entradas de nome local necessárias, apontando para um endereço de loopback.
3. Abra o arquivo `sas.code-workspace` no VS Code.
4. No terminal do VS Code, rode `sas launch` para subir todos os serviços.

### 5. Instalação no Windows (PowerShell)

1. Abra o PowerShell **como administrador** (o setup altera o arquivo `hosts` do Windows).
2. Clone o workspace, entre na pasta e execute `.\sas.ps1 setup`.
3. Abra o `sas.code-workspace` no VS Code.

### 6. Configurar o `hosts` do Windows manualmente (se necessário)

Quando o ambiente roda em WSL2, o navegador do Windows precisa resolver os nomes locais:

1. Abra o terminal como administrador (Shift + botão direito no menu e "Executar como administrador").
2. Abra uma aba do Prompt de Comando.
3. Acrescente ao arquivo `C:\Windows\System32\drivers\etc\hosts` as linhas de nome local (`sas`, `moodle`, `minio`, `minioadmin`) apontando para o endereço de loopback usado pelo script, o mesmo que o `sas setup` gravou no `/etc/hosts` do Linux.

### 7. Serviços disponíveis

- **Moodle**: no hostname local `moodle`, porta 80. A credencial inicial de desenvolvimento está na documentação privada do workspace.
- **Integrador AVA**: `localhost`, porta 8091. O primeiro usuário a acessar vira superusuário, com a mesma credencial do SUAP.
- **Painel AVA**: `localhost`, porta 8092, com a mesma regra de superusuário. Para depurar o Painel: `sas down painel && sas debug painel` (o debug do Painel é descrito como instável).

### 8. Backup e restauração da base de desenvolvimento

- Backup: `sas exec db /docker-entrypoint-initdb.d/do/db_backup.sh`. O script gera um dump SQL da base do Moodle dentro do contêiner/volume do serviço `db`; confira a saída para saber o nome e o caminho do arquivo.
- Restauração: importar o dump na base PostgreSQL do serviço `db`. Confirme no próprio `db_backup.sh` o nome do arquivo e o diretório antes de restaurar.

### 9. Atualizar o ambiente e trocar de branch

```bash
cd <pasta-do-workspace>
sas undeploy            # limpa o deploy
git fetch && git pull   # atualiza o workspace
sas setup
sas git fetch           # operações em todos os projetos
sas git checkout main
sas git checkout test
sas git pull
sas launch              # sobe tudo na nova branch
```

### 10. Erros comuns e dicas

- **`failed to set up container networking: network ... not found`**: o serviço parou pela metade. Execute `sas down` e suba de novo.
- **Serviço não abre no navegador**: o `hosts` não está configurado. O `sas setup` resolve no Linux, mas no Windows é preciso editar o arquivo manualmente (item 6).
- **Porta 80 ocupada**: pare o serviço que a usa (Apache, Nginx, IIS etc.).
- **Gerar um segredo aleatório para testes locais**: use um hash de uma fonte aleatória do sistema, nunca um valor reaproveitado de produção.

### 11. Convenção de commits do projeto

Prefixos usados: `feat` (funcionalidade), `fix` (correção), `refactor` (refatoração/performance), `style` (formatação), `test` (testes), `doc` (documentação), `env` (CI/CD e configurações) e `build` (build e dependências).

## Quando escalar

- Quando não houver acesso aos repositórios (CodeLab/GitHub) mesmo após o cadastro.
- Quando o ambiente não subir após `sas down`, `sas undeploy` e novo `sas setup`.
- Quando for necessária credencial ou dump de homologação/produção (não fornecidos pelo workspace).

## Equipe responsável

Equipe de desenvolvimento do AVA (CTE/DEAD/ZL).

## Links oficiais

- [Instalação do Docker Engine](https://docs.docker.com/engine/install/)
- [SUAP](https://suap.ifrn.edu.br)
- [CodeLab IFRN](https://codelab.ifrn.edu.br)

## Nível de confiabilidade

Prático.

## Notas adicionais

- O workspace é privado por conter configuração de ambiente; os plugins e serviços da suíte têm repositórios próprios.
- Credenciais padrão do ambiente local, endereços e valores de configuração foram propositalmente omitidos; consulte a documentação interna do workspace.
- Os arquivos mudam com frequência (versões de Python/PHP, serviços); valide o `README` do workspace antes de seguir este roteiro.
