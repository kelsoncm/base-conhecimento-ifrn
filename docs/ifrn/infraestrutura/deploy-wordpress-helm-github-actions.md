---
title: "Deploy de tema WordPress em Kubernetes com Helm e GitHub Actions"
category: "Infraestrutura"
service: "WordPress / Kubernetes"
audience: ["TIC", "Desenvolvedores", "DevOps"]
tags: ["wordpress", "kubernetes", "helm", "github-actions", "kubectl", "external-secrets", "vault", "backup", "ingress"]
reliability: "prático"
last_review: "2026-10-08"
source: "Experiência com o deploy de um tema WordPress próprio em cluster Kubernetes (workflow e chart Helm do projeto)"
---

## Sintoma

É preciso publicar um tema WordPress próprio em um site que roda em Kubernetes, de forma repetível, sem reconstruir a imagem a cada alteração e sem expor credenciais de banco no repositório.

## Contexto

O padrão descrito separa duas coisas:

- **Infraestrutura** (chart Helm): Deployment com imagem oficial `wordpress` (PHP-Apache), volume persistente em `/var/www/html`, Service, Ingress com TLS, segredos de banco e backup.
- **Tema** (workflow do GitHub Actions): ao publicar uma *release*, o tema é copiado para dentro do pod em execução, no diretório `wp-content/themes/<tema>`, que fica no volume persistente.

Como o tema vive no volume, o deploy não troca a imagem nem reinicia o pod. Os valores específicos do ambiente aparecem aqui como placeholders.

## Procedimento

### 1. Workflow de deploy (gatilho por release)

Disparo: evento `release` do tipo `published`. O job roda em um *runner* auto-hospedado (`<runner>`) que já tem `kubectl` e acesso ao cluster por um kubeconfig no próprio runner (variável `KUBECONFIG` apontando para o arquivo do runner; nunca versionar). Permissão mínima do job: `contents: read`.

Passos:

1. **Checkout da tag** da release (`ref` = tag, `fetch-depth: 1`).
2. **Descobrir o pod** pelo label do app, no namespace do site, e falhar se não achar:

   ```bash
   POD=$(kubectl get pod -n <namespace> -l app=<app> -o jsonpath='{.items[0].metadata.name}')
   [ -z "$POD" ] && { echo "Pod não encontrado."; exit 1; }
   echo "POD=$POD" >> $GITHUB_ENV
   ```

3. **Limpar o tema atual** (conteúdo do diretório, mantendo a pasta):

   ```bash
   kubectl exec -n <namespace> "$POD" -- bash -c \
     "find /var/www/html/wp-content/themes/<tema> -mindepth 1 -exec rm -rf {} +"
   ```

4. **Copiar o novo tema** com `tar` em stream, excluindo o que não é runtime (`.git`, `.github`, `helm`, `.gitignore`, READMEs, CI de outros provedores):

   ```bash
   tar --exclude=.git --exclude=.github --exclude=helm --exclude=.gitignore \
       --exclude=README.md --exclude=readme.md --no-same-owner -czf - . \
   | kubectl exec -i -n <namespace> "$POD" -- \
       tar --no-same-owner -xzf - -C /var/www/html/wp-content/themes/<tema>
   ```

5. **Ajustar permissões**: diretórios `755` e arquivos `644` com `find ... -exec chmod`.

Observações: a janela entre os passos 3 e 4 deixa o tema vazio por alguns segundos; o pod é escolhido por `items[0]`, o que só é seguro com uma réplica.

### 2. Chart Helm

Valores principais (`values.yaml`):

- `image`: `wordpress:php8.4-apache`, `pullPolicy: Always` (a tag é móvel; fixar versão se quiser reprodutibilidade).
- `wpcli`: segundo contêiner (`wordpress:cli`, `sleep infinity`) para rodar `wp` via `kubectl exec`, com limites próprios de CPU/memória e os mesmos segredos de banco.
- `resources`: requests e limits para o contêiner principal.
- `service`: `ClusterIP`, porta 80.
- `persistence`: `ReadWriteOnce`, PVC já existente (`existingClaim`), montado em `/var/www/html`.
- `autoscaling.enabled: false` e `replicaCount: 1`: com volume `ReadWriteOnce` o site é de uma única réplica; o HPA existe no chart, desligado.
- `affinity`: `nodeAffinity` obrigatória para um nó específico (`<no>`), ligada ao volume; reduz a disponibilidade se esse nó cair.
- `podLabels`: `app: <app>`, o mesmo label usado pelo workflow e pelo backup.

Ingress (nginx) com TLS automático:

```yaml
ingress:
  enabled: true
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "<cluster-issuer>"
    nginx.ingress.kubernetes.io/proxy-body-size: "100m"
    nginx.ingress.kubernetes.io/client-max-body-size: "100m"
  hosts:
    - host: <dominio-do-site>
      paths:
        - path: /
          pathType: ImplementationSpecific
  tls:
    - secretName: <app>-tls
      hosts: [<dominio-do-site>]
```

O limite de 100 MB permite uploads grandes na mídia do WordPress.

### 3. Segredos de banco com ExternalSecret e Vault

Nenhuma credencial fica no chart. O recurso `ExternalSecret` (External Secrets Operator) lê do cofre, via um `ClusterSecretStore` (`<secret-store>`), o caminho `<caminho-do-vault>` e cria o Secret `<app>-db-secrets` (`creationPolicy: Owner`, `refreshInterval: 1m`) com as chaves `db_host`, `db_name`, `db_user` e `db_password`.

O Deployment injeta essas chaves via `secretKeyRef` nas variáveis `WORDPRESS_DB_HOST`, `WORDPRESS_DB_NAME`, `WORDPRESS_DB_USER` e `WORDPRESS_DB_PASSWORD`, tanto no WordPress quanto no contêiner `wp-cli`. A rotação de senha passa a ser feita só no cofre; o pod precisa ser reiniciado para ler o novo valor.

### 4. Backup por CronJob

O chart traz um `CronJob` de backup dos arquivos (`wp-content`), com ServiceAccount, Role (`pods`: get/list; `pods/exec`: create) e RoleBinding restritos ao namespace.

- Agenda em `America/Sao_Paulo`, `concurrencyPolicy: Forbid`, histórico curto de jobs. No chart de origem vem com `suspend: true`, ou seja, **desligado até ser habilitado**.
- Imagem Alpine; instala `openssh-client`, `curl` e `tar` e baixa o `kubectl` na hora.
- O dia da semana (0 a 6) define o diretório e o nome do arquivo, formando uma rotação semanal de 7 backups.
- Fluxo em stream: `kubectl exec ... tar -czf - -C /var/www/html/wp-content .` seguido de `ssh <usuario>@<IP_BACKUP> "cat > <dir>/<arquivo>"`.
- A chave privada SSH vem de um Secret do Kubernetes (`<secret-ssh>`), nunca do chart.

Este backup cobre **somente arquivos**. O banco precisa de backup próprio (dump do servidor de banco).

### 5. Checklist de adoção

1. Criar o PVC e o namespace; cadastrar o segredo de banco no cofre.
2. Instalar o chart (`helm upgrade --install <app> ./helm -n <namespace>`).
3. Garantir que o runner `<runner>` tenha `kubectl` e acesso ao namespace.
4. Criar a primeira release e acompanhar o workflow; conferir o tema em Aparência.
5. Ativar o backup (`suspend: false`) após configurar o destino `<IP_BACKUP>` e a chave.

## Quando escalar

- Pod não encontrado ou em loop de erro: administração do cluster.
- `ExternalSecret` sem sincronizar ou cofre inacessível: equipe responsável pelo cofre de segredos.
- Certificado TLS não emitido: equipe do cluster (cert-manager) e DNS.
- Runner sem acesso ao cluster: equipe que mantém o runner.

## Equipe responsável

Equipe de infraestrutura/DevOps responsável pelo cluster Kubernetes, em conjunto com os desenvolvedores do tema.

## Links oficiais

- [Imagem oficial do WordPress](https://hub.docker.com/_/wordpress)
- [Helm: documentação](https://helm.sh/docs/)
- [External Secrets Operator](https://external-secrets.io/latest/)
- [GitHub Actions: evento release](https://docs.github.com/actions/using-workflows/events-that-trigger-workflows#release)
- [cert-manager](https://cert-manager.io/docs/)

## Nível de confiabilidade

Prático. Padrão em uso, com pontos de melhoria listados abaixo.

## Notas adicionais

Pontos de atenção encontrados no chart de origem; corrigir ao reutilizar:

- O Deployment declara um volume `promtail-config` (ConfigMap) sem o contêiner nem o ConfigMap correspondentes; remover ou completar.
- O contêiner `wp-cli` tem um nome de variável de usuário de banco com erro de digitação; usar `WORDPRESS_DB_USER`.
- O backup usa SSH com `StrictHostKeyChecking no` e usuário privilegiado no destino; preferir usuário dedicado sem privilégios e chave de host conhecida.
- O backup baixa o `kubectl` da internet a cada execução; preferir imagem com o binário fixado.
- Nunca versionar kubeconfig, chaves SSH, caminhos do cofre ou IPs internos; manter como segredos do runner/cluster.
