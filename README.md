# Base de Conhecimento TIC IFRN

Repositório de artigos técnicos e procedimentos para equipes de TIC do IFRN.

## Estrutura

```
docs/
├─ redes/
│  ├─ solucao-problemas-wifi-eduroam.md
│  ├─ autorizacao-dispositivos-wifrn-iot.md
│  ├─ reserva-ip-dhcp.md
│  ├─ infovia-potiguar-rnp.md
│  ├─ linux-wifi-corporativo.md
│  └─ eventos-wifi-visitantes.md
├─ suap/
│  ├─ lentidao-modulo-rsc.md
│  ├─ configuracao-email-institucional.md
│  ├─ integracao-api-suap.md
│  └─ pgd-rsc-preenchimento-tempo.md
├─ infraestrutura/
│  ├─ migracao-vmware-proxmox.md
│  └─ monitoramento-librenms-zabbix.md
├─ procedimentos/
│  ├─ liberacao-usuarios-externos.md
│  └─ abertura-chamados-suap.md
├─ sistemas/
│  ├─ windows-update-wsus-rsat.md
│  ├─ limites-envio-email-webmail.md
│  └─ sistema-ponto-cadastro-digital.md
├─ contratos/
│  └─ outsourcing-impressao-demanda.md
├─ acesso-remoto/
│  └─ guacamole-solicitacao.md
└─ licencas/
   └─ office365-microsoft365-licencas.md
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

### Redes (6 artigos)

- [Solução de problemas de conexão à eduroam e wIFRN-Corp](docs/redes/solucao-problemas-wifi-eduroam.md)
- [Como autorizar dispositivos na rede wIFRN-IoT](docs/redes/autorizacao-dispositivos-wifrn-iot.md)
- [Reserva de IP fixo via DHCP para dispositivos](docs/redes/reserva-ip-dhcp.md)
- [Infovia Potiguar e RNP - Convênio e responsabilidades](docs/redes/infovia-potiguar-rnp.md)
- [Linux - Configuração de Wi-Fi corporativo](docs/redes/linux-wifi-corporativo.md)
- [Eventos e Wi-Fi para visitantes](docs/redes/eventos-wifi-visitantes.md)

### SUAP (4 artigos)

- [Diagnóstico de lentidão no SUAP em períodos de alta demanda](docs/suap/lentidao-modulo-rsc.md)
- [Configuração de clientes de e-mail institucional](docs/suap/configuracao-email-institucional.md)
- [Integração de aplicações com a API do SUAP](docs/suap/integracao-api-suap.md)
- [PGD e RSC - Preenchimento de tempo e designações](docs/suap/pgd-rsc-preenchimento-tempo.md)

### Infraestrutura (2 artigos)

- [Migração de infraestrutura VMware para Proxmox com backup automatizado](docs/infraestrutura/migracao-vmware-proxmox.md)
- [Monitoramento de rede com LibreNMS e Zabbix](docs/infraestrutura/monitoramento-librenms-zabbix.md)

### Procedimentos (2 artigos)

- [Liberação de usuários externos para uso de laboratórios](docs/procedimentos/liberacao-usuarios-externos.md)
- [Abertura de chamados na Central de Serviços do SUAP](docs/procedimentos/abertura-chamados-suap.md)

### Sistemas (3 artigos)

- [Windows Update e WSUS - Instalação de RSAT](docs/sistemas/windows-update-wsus-rsat.md)
- [Limites de envio de e-mail no webmail](docs/sistemas/limites-envio-email-webmail.md)
- [Sistema de ponto - Cadastro de digital](docs/sistemas/sistema-ponto-cadastro-digital.md)

### Contratos (1 artigo)

- [Outsourcing de impressão - Planejamento de demanda](docs/contratos/outsourcing-impressao-demanda.md)

### Acesso Remoto (1 artigo)

- [Guacamole - Solicitação de acesso remoto](docs/acesso-remoto/guacamole-solicitacao.md)

### Licenças (1 artigo)

- [Office 365 e Microsoft 365 - Licenças disponíveis](docs/licencas/office365-microsoft365-licencas.md)

## Visualização Local

```bash
uv run --with-requirements requirements.txt mkdocs serve
```

## Fonte

Este repositório foi inicialmente alimentado a partir de conversas de equipes de TIC do IFRN, com curadoria e estruturação para formato de base de conhecimento.

## Licença

[Definir licença apropriada]
