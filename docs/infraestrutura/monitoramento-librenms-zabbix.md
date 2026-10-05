---
title: "Monitoramento de rede com LibreNMS e Zabbix"
category: "Infraestrutura"
service: "Monitoramento"
audience: ["TIC", "Administradores de Rede"]
tags: ["monitoramento", "librenms", "zabbix", "rede", "snmp", "grafana"]
reliability: "prático"
last_review: "2026-10-05"
source: "Experiências trocadas entre colaboradores"
---

## Sintoma

Equipes de TIC precisam implementar ou melhorar o monitoramento de rede, servidores e serviços, mas têm dúvidas sobre qual ferramenta usar (LibreNMS vs Zabbix) e como configurar.

## Contexto

Existem múltiplas ferramentas de monitoramento disponíveis, cada uma com vantagens e desvantagens. LibreNMS e Zabbix são amplamente utilizados, mas atendem a perfis diferentes de uso.

## Comparação

| Característica | LibreNMS | Zabbix |
|---|---|---|
| **Complexidade** | Baixa (já vem configurado) | Média/Alta (requer configuração) |
| **Descoberta automática** | Sim (via SNMP, LLDP, CDP) | Parcial (requer configuração) |
| **Mapa de topologia** | Sim (automático) | Sim (manual ou via addons) |
| **Interface** | Intuitiva e limpa | Completa mas complexa |
| **Customização** | Limitada | Alta |
| **Comunidade** | Ativa | Muito ativa |
| **Modelo de negócio** | Free (capital em treinamentos) | Free (suporte pago disponível) |

## Procedimento

### 1. Escolher a ferramenta adequada

#### LibreNMS

- Recomendado para:
  - Monitoramento de rede com descoberta automática.
  - Equipes que preferem configuração mínima.
  - Ambientes que valorizam mapa de topologia automático.
- Vantagens:
  - Já vem com configurações padrão funcionais.
  - Descobre dispositivos automaticamente via SNMP, LLDP, CDP.
  - Gera mapa de topologia automaticamente.
  - Interface intuitiva e fácil de usar.

#### Zabbix

- Recomendado para:
  - Monitoramento avançado e altamente customizável.
  - Equipes com experiência em configuração de ferramentas.
  - Ambientes que exigem dashboards complexos e alertas específicos.
- Vantagens:
  - Altamente customizável.
  - Grande quantidade de templates disponíveis.
  - Integração com Grafana para dashboards avançados.
  - Comunidade muito ativa.

### 2. Implementar LibreNMS

1. Instalar em servidor dedicado (VM ou físico).
2. Configurar acesso ao Active Directory para autenticação.
3. Adicionar grupos de usuários (admins, leitura).
4. Configurar descoberta de dispositivos:
   - Definir intervalos de varredura.
   - Configurar comunidades SNMP.
   - Filtrar interfaces e VLANs relevantes.
5. Acessar interface web e validar descoberta.
6. Configurar alertas por e-mail ou outros canais.

### 3. Implementar Zabbix

1. Instalar servidor Zabbix e frontend.
2. Configurar banco de dados (MySQL, PostgreSQL).
3. Adicionar hosts e templates.
4. Configurar itens, triggers e ações.
5. Integrar com Grafana para dashboards avançados (opcional).
6. Configurar alertas e notificações.

### 4. Integração com Grafana

- Ambos LibreNMS e Zabbix podem integrar com Grafana.
- Grafana oferece dashboards mais flexíveis e visualizações avançadas.
- Requer configuração de datasource (MySQL, PostgreSQL, API).

### 5. Exemplo de implantação

- Servidor LibreNMS em `miziara.ifrn.local` (exemplo).
- Autenticação via AD.
- Grupo de admins com acesso total.
- Demais usuários com acesso somente leitura.
- Filtro de interfaces e VLANs para reduzir ruído.

## Quando escalar

- Quando houver problemas de desempenho no monitoramento.
- Quando for necessário monitorar serviços ou dispositivos específicos não cobertos pelos templates.
- Quando a equipe não tiver experiência com a ferramenta escolhida.

## Equipe responsável

Administradores de rede e infraestrutura de cada campus.

## Links oficiais

- [LibreNMS](https://www.librenms.org/)
- [Zabbix](https://www.zabbix.com/)
- [Grafana](https://grafana.com/)

## Nível de confiabilidade

Prático.

## Notas adicionais

- O Zabbix adiciona uma camada de complexidade que pode atrapalhar mais do que ajudar em ambientes menores.
- O LibreNMS é considerado mais intuitivo e fácil de configurar "out of the box".
- A escolha entre as ferramentas depende do perfil da equipe e das necessidades específicas.
- Desenvolvedores do Zabbix podem não priorizar simplificação da interface, pois o modelo de negócio inclui treinamentos.
- É possível customizar o LibreNMS, mas requer esforço e conhecimento técnico.
