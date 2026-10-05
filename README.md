# Base de Conhecimento TIC IFRN

Repositório de artigos técnicos e procedimentos para equipes de TIC do IFRN.

## Visualização Online e Local

A documentação é publicada automaticamente no GitHub Pages utilizando o tema **Material for MkDocs**.

### Executar Localmente

Com [uv](https://github.com/astral-sh/uv):
```bash
uv run --with-requirements requirements.txt mkdocs serve
```

Ou com `python` / `pip`:
```bash
pip install -r requirements.txt
mkdocs serve
```

Acesse [http://127.0.0.1:8000](http://127.0.0.1:8000) para navegar no site local com recarregamento em tempo real.

Para validar o build estrito localmente:
```bash
uv run --with-requirements requirements.txt mkdocs build --strict
```

Para validar a pipeline do GitHub Actions localmente com [act](https://nektosact.com/):
```bash
act -j build --pull=false
```

---

## Estrutura do Repositório

```
docs/
├─ index.md
├─ contribuindo.md
├─ redes/
│  ├─ solucao-problemas-wifi-eduroam.md
│  ├─ autorizacao-dispositivos-wifrn-iot.md
│  └─ reserva-ip-dhcp.md
├─ infraestrutura/
│  ├─ migracao-vmware-proxmox.md
│  └─ monitoramento-librenms-zabbix.md
├─ suap/
│  └─ lentidao-modulo-rsc.md
├─ desenvolvimento/
│  └─ integracao-api-suap.md
├─ e-mail/
│  └─ configuracao-email-institucional.md
└─ procedimentos/
   ├─ liberacao-usuarios-externos.md
   └─ abertura-chamados-suap.md
templates/
└─ artigo.md
mkdocs.yml
requirements.txt
```

---

## Como Contribuir

1. Leia o [CONTRIBUTING.md](CONTRIBUTING.md).
2. Use o template em `templates/artigo.md` para criar novos artigos.
3. Salve o arquivo na pasta apropriada em `docs/`.
4. Atualize a navegação no `mkdocs.yml` se criar uma nova categoria ou arquivo.
5. Valide o build com `mkdocs build --strict`.
6. Atualize o campo `last_review` sempre que revisar o artigo.

---

## Níveis de Confiabilidade

- **Confirmado:** procedimento apoiado por documentação oficial ou validação da equipe responsável.
- **Prático:** solução testada por um ou mais técnicos, mas ainda sem documentação formal.
- **Hipótese:** possibilidade levantada durante a conversa.
- **Obsoleto:** informação que pode ter mudado e precisa de nova validação.

---

## Artigos Disponíveis

### Redes
- [Solução de problemas de conexão à eduroam e wIFRN-Corp](docs/redes/solucao-problemas-wifi-eduroam.md)
- [Como autorizar dispositivos na rede wIFRN-IoT](docs/redes/autorizacao-dispositivos-wifrn-iot.md)
- [Reserva de IP fixo via DHCP para dispositivos](docs/redes/reserva-ip-dhcp.md)

### Infraestrutura
- [Migração de infraestrutura VMware para Proxmox com backup automatizado](docs/infraestrutura/migracao-vmware-proxmox.md)
- [Monitoramento de rede com LibreNMS e Zabbix](docs/infraestrutura/monitoramento-librenms-zabbix.md)

### SUAP & Desenvolvimento
- [Diagnóstico de lentidão no SUAP em períodos de alta demanda](docs/suap/lentidao-modulo-rsc.md)
- [Integração de aplicações com a API do SUAP](docs/desenvolvimento/integracao-api-suap.md)

### Serviços & E-mail
- [Configuração de clientes de e-mail institucional](docs/e-mail/configuracao-email-institucional.md)

### Procedimentos
- [Liberação de usuários externos para uso de laboratórios](docs/procedimentos/liberacao-usuarios-externos.md)
- [Abertura de chamados na Central de Serviços do SUAP](docs/procedimentos/abertura-chamados-suap.md)

---

## Licença

[Definir licença apropriada]
