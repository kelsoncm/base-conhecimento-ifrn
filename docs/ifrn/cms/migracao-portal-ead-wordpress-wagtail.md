---
title: "Planejamento da migração do Portal EaD (WordPress) para o Portal Institucional (Wagtail)"
category: "CMS"
service: "Portal EaD / Portal Institucional"
audience: ["TIC", "Desenvolvedores", "Comunicação"]
tags: ["wordpress", "wagtail", "migração", "etl", "streamfield", "gutenberg", "redirects", "cms"]
reliability: "prático"
last_review: "2026-10-08"
source: "Planejamento técnico (relatório v3) e inventário do banco do WordPress, com decisões de reunião com a equipe do portal"
---

## Sintoma

O Portal EaD (WordPress) precisa ser desativado e seu conteúdo aproveitado no Portal Institucional (Wagtail), mas não está claro o que migra, quem decide, como converter blocos do editor Gutenberg para o modelo de destino e o que fazer com o legado.

## Contexto

Esta etapa é de **análise e planejamento**: a execução da migração não está autorizada e nada deve ser escrito nos ambientes de produção (origem ou destino) nem no ambiente de treinamento do destino. Os números abaixo vêm do inventário feito sobre uma cópia local do banco; o que é estimativa está indicado como tal.

O Portal EaD usa um único tema próprio e plugins como ACF, AIOSEO, Essential Blocks, Web Stories e redirecionamento 301. Parte do conteúdo foi escrita com o editor clássico (HTML solto) e parte com blocos Gutenberg.

## Procedimento

### 1. Delimitar o escopo

**Ficam fora da migração:**

- Cursos, editais/processos seletivos e eventos: já são nativos no portal de destino (page types próprios e calendário).
- Polos presenciais: não serão migrados.
- Páginas de videoaulas do Moodle, formulário de contato antigo e páginas sobre polos, processo seletivo e inscrição em evento.
- Web Stories (AMP): apenas acervo estático.
- Tabelas de interessados em cursos (dados pessoais, LGPD): **não migrar nem copiar**; manter só no ambiente local de análise e confirmar a data da última gravação em produção.

**Ficam dentro:** notícias (inclusive as de 2025–2026), páginas institucionais e o que a Comunicação decidir manter.

### 2. Definir papéis por setor

| Setor | Responsabilidade |
|---|---|
| Engenharia de dados e plataforma (EaD) | Inventário, ETL, scripts, acervo estático e mapa de redirects. Não faz curadoria editorial. |
| Comunicação | Decide o que migra, arquiva ou descarta; reescrita, chapéu e subtítulo; critério de quantidade de notícias; dados de acesso (GA4). |
| Equipe do portal de destino (Wagtail) | Arquitetura, page types, blocos e carga em produção. |
| Direção geral | Vigência administrativa e informações institucionais. |
| TI (infraestrutura) | DNS, TLS e servidor. |

### 3. Registrar as decisões já tomadas

- O conteúdo migrado entra na **estrutura de blocos (StreamField)**, editável. **HTML bruto não é aceito**: exibe, mas impede a edição.
- O esforço depende de mapear os blocos Gutenberg *efetivamente usados* (e variantes) para componentes do portal, definindo valores padrão para campos obrigatórios e limites de tamanho.
- O legado (inclusive editais antigos) vira **arquivo HTML estático**, sem WordPress/banco em execução (plugin de conversão estática ou scraper).
- Todo conteúdo migrado recebe **redirecionamento** (301).
- Quantidade de notícias a migrar: critério da Comunicação, não da equipe técnica.
- Já houve migração automatizada de notícias de outro CMS para o mesmo portal, com estrutura semelhante.

### 4. Conhecer as restrições do modelo de destino

Blocos comuns aos tipos de página: `rich_text`, `introduction` (até 280 caracteres), `info`, `colecao`, `table`, `links`, `single_link`, `banners`, `cards`, `calendar`, `definition_lists`, `faq`, `gallery`, `presentation`, `quote`, `stats`, `timeline`, `video`.

- **Não existem** blocos de título, imagem avulsa, botão, colunas/grupo, HTML, áudio ou MP4. Títulos e listas vão para o `rich_text`.
- `gallery`: só imagens (sem legenda, link ou carrossel). `table`: células de texto simples. `video`: apenas ID do YouTube e título de seção obrigatório.
- Campos obrigatórios (autor de citação, títulos de links, formato de imagem de card) exigem valor padrão na conversão.
- `colecao` lista documentos/imagens de uma coleção, **não notícias**.
- `faq` guarda resposta só em texto: acordeões com listas, links ou negrito perdem formatação; nesses casos preferir `rich_text` com título.
- Notícia: corpo obrigatório; chapéu, subtítulo (até 2.000 caracteres) e imagem de destaque opcionais; fica sob a pasta de notícias.
- Página: o corpo precisa ter ao menos um bloco `rich_text` ou `introduction`, senão não salva.
- Curso não pode ficar sob a árvore de um campus; processo seletivo exige no mínimo duas etapas datadas (outro motivo para editais antigos irem ao estático).
- Os recursos do editor de texto rico (níveis de título, imagem, links de documento) dependem de configuração do destino que ainda precisa ser confirmada com a equipe do portal.

### 5. Usar os achados do inventário

Primeira rodada (todos os itens publicados): **3.059 itens**.

- Editor: blocos 1.720, clássico 1.261, misto 49, vazio 29. Até 2018 predomina o clássico; de 2019 em diante, blocos. As notícias de 2025–2026 são 100% em blocos.
- **90 blocos Gutenberg distintos**. Volume concentrado em parágrafo, título (quase só h3/h4), botão (cerca de 95% o mesmo botão centralizado), imagem, lista, shortcode, tabela e slideshow. A cauda longa (blocos de e-commerce, query, essential-blocks raros) é descartável.
- Inventário filtrado pelo escopo: **1.397 itens** (1.278 posts, 91 páginas, 28 web stories) e 1.662 retirados. A exclusão por título "Edital…" é aproximada e precisa de validação pela Comunicação.
- **Shortcodes**: a primeira avaliação (sobre HTML renderizado) afirmava que não havia; o banco mostra o contrário. Em escopo há 95 itens com shortcode, entre eles `learn_more` (acordeão, vira `faq`), `caption` (imagem com legenda), `gallery`/`nggallery` (viram `gallery`), abas de vídeos (sem bloco equivalente), formulário de contato (sem bloco equivalente) e playlists do YouTube (decisão da Comunicação). Shortcodes de edital, polo e curso são ignorados.
- **Plugins**: os ativos no banco são poucos; Jetpack, WooCommerce, NextGEN e Elementor são restos de instalações antigas. Shortcodes de plugins inativos aparecem hoje como texto cru no site.
- **Uploads**: cerca de 90 mil arquivos (com miniaturas). O conteúdo em escopo referencia 3.774 arquivos distintos; 98,6% existem (cerca de 4 GB) e 53 faltam e precisam ser localizados no backup.

### 6. Executar por fases (proposta)

Fluxo de dados: WordPress (banco e uploads) → extração e transformação → decisão editorial → validação em ambiente de treinamento → carga em produção → redirects 301. Em paralelo, congelar o acervo estático e tratar a reescrita de URLs do restante.


```mermaid
--8<-- "docs/assets/diagramas/cms-etl.mmd"
```

Classificação de cada item pela Comunicação: **A** migrar, **B** migrar com reescrita, **C** acervo estático, **D** descartar.

```mermaid
--8<-- "docs/assets/diagramas/cms-destino.mmd"
```

| Fase | Conteúdo | Duração estimada |
|---|---|---|
| F0 | Alinhamento | 2 semanas |
| F1 | Inventário | 1 semana |
| F2 | Decisão editorial | 4 semanas |
| F3 | Pipeline (ETL) | 4 semanas |
| F4 | Piloto | 2 semanas |
| F5 | Homologação | 3 semanas |
| F6 | Acervo estático | 2 semanas |
| F7 | Produção | 2 semanas |
| F8 | Cutover | 2 semanas |
| F9 | Acompanhamento | 4 semanas |

Dependências entre as fases:

```mermaid
--8<-- "docs/assets/diagramas/cms-fases.mmd"
```

A estimativa global do relatório é de aproximadamente 1.080 horas em cerca de 20 semanas. É estimativa, a refinar após as respostas da equipe do portal; a fase de decisão editorial é a de maior impacto no prazo.

## Quando escalar

- Dúvidas sobre blocos, page types, recursos do editor de texto rico ou canal de carga: equipe do portal de destino.
- Decisão sobre quais notícias migram, acordeões pendentes, galerias e playlists: Comunicação.
- DNS, TLS, servidor e reescrita do que permanece no domínio antigo: TI de infraestrutura.
- Qualquer dúvida sobre dados pessoais encontrados no banco: encarregado de dados/LGPD antes de qualquer cópia.

## Equipe responsável

Engenharia de dados e plataforma da EaD, em conjunto com a Comunicação e a equipe do portal institucional (Wagtail).

## Links oficiais

- [Wagtail: StreamField](https://docs.wagtail.org/en/stable/topics/streamfield.html)
- [Wagtail: redirects](https://docs.wagtail.org/en/stable/reference/contrib/redirects.html)
- [WordPress: editor de blocos](https://wordpress.org/gutenberg/)

## Nível de confiabilidade

Prático. Números verificados no inventário local; prazos e horas são estimativas.

## Notas adicionais

- Diferenciar sempre dado verificado (inventário/banco) de estimativa, e sugestão técnica de decisão editorial.
- O mapa de redirects deve ser gerado a partir do inventário, antes do cutover.
- Este artigo é um resumo; o relatório completo e as perguntas em aberto para a equipe do portal ficam no material de planejamento do projeto.
- Os diagramas ficam em `docs/assets/diagramas/cms-*.mmd` e são incluídos no artigo no momento do build.
