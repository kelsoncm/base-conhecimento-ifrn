# Política de Segurança

Esta política de segurança estabelece as diretrizes para o relato de vulnerabilidades, tratamento de incidentes e proteção de informações confidenciais na **Base de Conhecimento TIC IFRN**.

---

## 1. Escopo e Diretrizes de Conteúdo

Por se tratar de um repositório voltado a procedimentos operacionais, manuais técnicos e guias de infraestrutura de TIC:

- **Não inclusão de dados sensíveis**: É terminantemente proibido incluir senhas reais, credenciais de acesso, chaves privadas (SSH/TLS), tokens de API ou segredos institucionais nos arquivos e no histórico do Git.
- **Proteção de Dados Pessoais (LGPD)**: Exemplos, logs ou capturas de tela não devem conter dados pessoais identificáveis (como CPF, matrículas, e-mails reais de servidores ou discentes), em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
- **Dados e IPs fictícios**: Todos os exemplos e comandos devem utilizar endereços IP reservados para documentação (RFC 5737 e RFC 1918), domínios fictícios (RFC 2606) ou marcações explícitas de preenchimento (ex.: `<SEU_USUARIO>`, `192.0.2.10`, `exemplo.ifrn.edu.br`).

---

## 2. Como Relatar uma Vulnerabilidade ou Vazamento

Se você identificou uma vulnerabilidade de segurança neste repositório, em sistemas institucionais documentados ou a exposição acidental de credenciais/dados sensíveis:

> **Atenção:** NÃO abra uma _issue_ pública nem crie _pull requests_ públicos expondo a vulnerabilidade ou os dados vazados.

### Canais para Notificação Responsável:

1. **Relato Privado no GitHub**:
   - Utilize a funcionalidade de [Relato Privado de Vulnerabilidades do GitHub](https://github.com/kelsoncm/base-conhecimento-ifrn/security/advisories/new) (Security Advisories), caso disponível.
2. **Contato com o Mantenedor**:
   - Envie um e-mail para **Kelson da Costa Medeiros** em: [kelsoncm@gmail.com](mailto:kelsoncm@gmail.com).
3. **Canais Institucionais (Incidentes em Serviços do IFRN)**:
   - Para falhas críticas ou incidentes em sistemas em produção do IFRN, notifique a equipe responsável através dos canais oficiais da DITIC/DIGTI ou da Equipe de Tratamento e Resposta a Incidentes de Redes (ETIR/IFRN).

---

## 3. Informações Desejadas no Relato

Ao enviar uma notificação de vulnerabilidade ou exposição de dados, inclua o máximo de informações possível para agilizar a triagem:

- **Descrição da ocorrência**: Explicação detalhada da vulnerabilidade ou do dado exposto.
- **Localização**: Arquivo(s), linha(s) ou commit(s) envolvidos no repositório.
- **Impacto potencial**: Quem ou quais sistemas podem ser afetados.
- **Passos para reprodução**: Instruções claras e passos para validar a situação reportada.
- **Sugestão de correção** (opcional): Medidas recomendadas para mitigar ou sanar o problema.

---

## 4. Procedimento de Resposta e Correção

Após o recebimento do relato:

1. **Confirmação de recebimento**: O reporte será reconhecido e avaliado preliminarmente.
2. **Triagem e Contenção Imediata**:
   - Se houver exposição de credenciais ou dados sigilosos:
     - As credenciais afetadas deverão ser imediatamente rotacionadas/revogadas no ambiente real.
     - O histórico do Git poderá ser reescrito (*purge*) para remover os dados sensíveis permanentemente.
3. **Correção e Atualização**: O conteúdo será corrigido e revisado.
4. **Encerramento**: O relator será informado da resolução do incidente.

---

## 5. Versões e Validade dos Documentos

A branch `main` reflete o estado mais atual dos procedimentos documentados. Observe os níveis de confiabilidade informados no cabeçalho de cada artigo (`confirmado`, `prático`, `hipótese`, `obsoleto`) antes de aplicar comandos em ambientes de produção.
