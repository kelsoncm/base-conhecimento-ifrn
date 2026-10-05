# Conhecimentos Pessoais

> [!WARNING]
> **Aviso de Isenção de Responsabilidade (Conteúdo Pessoal e Não Oficial):**
> Este repositório é de caráter estritamente pessoal, destinado ao registro, estudo e compartilhamento de anotações técnicas de **Kelson da Costa Medeiros**.
> **NÃO se trata de base oficial, canal institucional ou documentação formal do Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Norte (IFRN).**
> Procedimentos, tutoriais e notas refletem experiências práticas e de estudo individuais, devendo ser avaliados criteriosamente antes de qualquer aplicação em produção. Para diretrizes e orientações institucionais formais, consulte sempre os canais e sistemas oficiais do IFRN.

Repositório pessoal de artigos técnicos, guias e procedimentos práticos. Atualmente, os procedimentos e estudos organizados estão agrupados na subpasta [`docs/ifrn/`](docs/ifrn/), contextualizados a sistemas e serviços vivenciados no dia a dia técnico. Na raiz do site publicado, o acesso é automaticamente redirecionado para a seção `ifrn/`.

## Estrutura

```
docs/
├─ index.md (redirecionamento para ifrn/)
├─ ifrn/
│  ├─ index.md (apresentação do acervo IFRN com aviso de isenção)
│  ├─ redes/
│  │  ├─ solucao-problemas-wifi-eduroam.md
│  │  ├─ autorizacao-dispositivos-wifrn-iot.md
│  │  ├─ reserva-ip-dhcp.md
│  │  ├─ infovia-potiguar-rnp.md
│  │  ├─ linux-wifi-corporativo.md
│  │  └─ eventos-wifi-visitantes.md
│  ├─ suap/
│  │  ├─ lentidao-modulo-rsc.md
│  │  ├─ configuracao-email-institucional.md
│  │  ├─ integracao-api-suap.md
│  │  └─ pgd-rsc-preenchimento-tempo.md
│  ├─ infraestrutura/
│  │  ├─ migracao-vmware-proxmox.md
│  │  └─ monitoramento-librenms-zabbix.md
│  ├─ procedimentos/
│  │  ├─ liberacao-usuarios-externos.md
│  │  └─ abertura-chamados-suap.md
│  ├─ sistemas/
│  │  ├─ windows-update-wsus-rsat.md
│  │  ├─ limites-envio-email-webmail.md
│  │  └─ sistema-ponto-cadastro-digital.md
│  ├─ contratos/
│  │  └─ outsourcing-impressao-demanda.md
│  ├─ acesso-remoto/
│  │  └─ guacamole-solicitacao.md
│  └─ licencas/
│     └─ office365-microsoft365-licencas.md
templates/
└─ artigo.md
```

## Como contribuir

1. Leia o [CONTRIBUTING.md](CONTRIBUTING.md).
2. Use o template em `templates/artigo.md` para criar novos artigos.
3. Salve o arquivo na subpasta apropriada em `docs/ifrn/` (ou nova subpasta temática).
4. Revise o conteúdo com atenção à segurança da informação e privacidade.
5. Atualize o campo `last_review` sempre que revisar o artigo.

## Níveis de confiabilidade

- **Confirmado:** procedimento apoiado por documentação oficial ou validação da equipe responsável.
- **Prático:** solução testada em campo por técnicos, mas ainda sem documentação formal.
- **Hipótese:** possibilidade levantada durante estudo ou diagnóstico, pendente de validação.
- **Obsoleto:** informação desatualizada ou relativa a versões legadas, mantida apenas para referência histórica.

## Artigos disponíveis (Seção IFRN)

### Redes (6 artigos)

- [Solução de problemas de conexão à eduroam e wIFRN-Corp](docs/ifrn/redes/solucao-problemas-wifi-eduroam.md)
- [Como autorizar dispositivos na rede wIFRN-IoT](docs/ifrn/redes/autorizacao-dispositivos-wifrn-iot.md)
- [Reserva de IP fixo via DHCP para dispositivos](docs/ifrn/redes/reserva-ip-dhcp.md)
- [Infovia Potiguar e RNP - Convênio e responsabilidades](docs/ifrn/redes/infovia-potiguar-rnp.md)
- [Linux - Configuração de Wi-Fi corporativo](docs/ifrn/redes/linux-wifi-corporativo.md)
- [Eventos e Wi-Fi para visitantes](docs/ifrn/redes/eventos-wifi-visitantes.md)

### SUAP (4 artigos)

- [Diagnóstico de lentidão no SUAP em períodos de alta demanda](docs/ifrn/suap/lentidao-modulo-rsc.md)
- [Configuração de clientes de e-mail institucional](docs/ifrn/suap/configuracao-email-institucional.md)
- [Integração de aplicações com a API do SUAP](docs/ifrn/suap/integracao-api-suap.md)
- [PGD e RSC - Preenchimento de tempo e designações](docs/ifrn/suap/pgd-rsc-preenchimento-tempo.md)

### Infraestrutura (2 artigos)

- [Migração de infraestrutura VMware para Proxmox com backup automatizado](docs/ifrn/infraestrutura/migracao-vmware-proxmox.md)
- [Monitoramento de rede com LibreNMS e Zabbix](docs/ifrn/infraestrutura/monitoramento-librenms-zabbix.md)

### Procedimentos (2 artigos)

- [Liberação de usuários externos para uso de laboratórios](docs/ifrn/procedimentos/liberacao-usuarios-externos.md)
- [Abertura de chamados na Central de Serviços do SUAP](docs/ifrn/procedimentos/abertura-chamados-suap.md)

### Sistemas (3 artigos)

- [Windows Update e WSUS - Instalação de RSAT](docs/ifrn/sistemas/windows-update-wsus-rsat.md)
- [Limites de envio de e-mail no webmail](docs/ifrn/sistemas/limites-envio-email-webmail.md)
- [Sistema de ponto - Cadastro de digital](docs/ifrn/sistemas/sistema-ponto-cadastro-digital.md)

### Contratos (1 artigo)

- [Outsourcing de impressão - Planejamento de demanda](docs/ifrn/contratos/outsourcing-impressao-demanda.md)

### Acesso Remoto (1 artigo)

- [Guacamole - Solicitação de acesso remoto](docs/ifrn/acesso-remoto/guacamole-solicitacao.md)

### Licenças (1 artigo)

- [Office 365 e Microsoft 365 - Licenças disponíveis](docs/ifrn/licencas/office365-microsoft365-licencas.md)

## Visualização Local

```bash
uv run --with-requirements requirements.txt mkdocs serve
```

## Fonte

Este acervo originou-se de anotações práticas, rotinas e estudos técnicos de Kelson da Costa Medeiros, estruturado como repositório de consulta pessoal aberta.

## Licença

[Definir licença apropriada]
