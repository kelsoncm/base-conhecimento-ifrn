# Base de Conhecimento TIC IFRN

Repositório de artigos técnicos e procedimentos para equipes de TIC do IFRN.

## Estrutura

```
docs/
├─ redes/
│  ├─ solucao-problemas-wifi-eduroam.md
│  ├─ autorizacao-dispositivos-wifrn-iot.md
│  └─ reserva-ip-dhcp.md
├─ infraestrutura/
│  ├─ migracao-vmware-proxmox.md
│  ├─ monitoramento-librenms-zabbix.md
│  └─ windows-update-wsus-rsat.md
├─ suap/
│  └─ lentidao-modulo-rsc.md
├─ desenvolvimento/
│  └─ integracao-api-suap.md
├─ e-mail/
│  ├─ configuracao-email-institucional.md
│  └─ limites-envio-email-webmail.md
├─ contratos/
│  └─ outsourcing-impressao-demanda.md
├─ acesso-remoto/
│  └─ guacamole-solicitacao.md
└─ procedimentos/
   ├─ liberacao-usuarios-externos.md
   └─ abertura-chamados-suap.md
templates/
└─ artigo.md
```

## Como contribuir

1. Leia o [CONTRIBUTING.md](CONTRIBUTING.md).
2. Use o template em `templates/artigo.md` para criar novos artigos.
3. Salve o arquivo na pasta apropriada em `docs/`.
4. Revise o conteúdo com a equipe responsável.
5. Atualize o campo `last_review` sempre que revisar o artigo.

## Níveis de confiabilidade

- **Confirmado:** procedimento apoiado por documentação oficial ou validação da equipe responsável.
- **Prático:** solução testada por um ou mais técnicos, mas ainda sem documentação formal.
- **Hipótese:** possibilidade levantada durante a conversa.
- **Obsoleto:** informação que pode ter mudado e precisa de nova validação.

## Artigos disponíveis

### Redes

- [Solução de problemas de conexão à eduroam e wIFRN-Corp](docs/redes/solucao-problemas-wifi-eduroam.md)
- [Como autorizar dispositivos na rede wIFRN-IoT](docs/redes/autorizacao-dispositivos-wifrn-iot.md)
- [Reserva de IP fixo via DHCP para dispositivos](docs/redes/reserva-ip-dhcp.md)

### Infraestrutura

- [Migração de infraestrutura VMware para Proxmox com backup automatizado](docs/infraestrutura/migracao-vmware-proxmox.md)
- [Monitoramento de rede com LibreNMS e Zabbix](docs/infraestrutura/monitoramento-librenms-zabbix.md)
- [Windows Update e WSUS - Instalação de RSAT e Features on Demand](docs/infraestrutura/windows-update-wsus-rsat.md)

### SUAP & Desenvolvimento

- [Diagnóstico de lentidão no SUAP em períodos de alta demanda](docs/suap/lentidao-modulo-rsc.md)
- [Integração de aplicações com a API do SUAP](docs/desenvolvimento/integracao-api-suap.md)

### Serviços & E-mail

- [Configuração de clientes de e-mail institucional](docs/e-mail/configuracao-email-institucional.md)
- [Limites de envio de e-mail no webmail institucional](docs/e-mail/limites-envio-email-webmail.md)

### Acesso Remoto

- [Guacamole - Solicitação de acesso remoto ao SUAP](docs/acesso-remoto/guacamole-solicitacao.md)

### Contratos

- [Outsourcing de impressão - Planejamento de demanda e contratos](docs/contratos/outsourcing-impressao-demanda.md)

### Procedimentos

- [Liberação de usuários externos para uso de laboratórios](docs/procedimentos/liberacao-usuarios-externos.md)
- [Abertura de chamados na Central de Serviços do SUAP](docs/procedimentos/abertura-chamados-suap.md)

## Visualização Local

```bash
uv run --with-requirements requirements.txt mkdocs serve
```

## Fonte

Este repositório foi inicialmente alimentado a partir de conversas de equipes de TIC do IFRN, com curadoria e estruturação para formato de base de conhecimento.

## Licença

[Definir licença apropriada]
