# Déploiement sur Microsoft Azure

Ce guide explique comment déployer EasyPLC School sur Azure avec différentes options.

## Option 1 : Azure App Service + Azure Database for PostgreSQL

### Prérequis

- Compte Azure avec abonnement actif
- Azure CLI installé (`az --version`)

### Étape 1 : Connexion à Azure

```bash
az login
az account set --subscription "Votre-Abonnement"
```

### Étape 2 : Créer un groupe de ressources

```bash
az group create \
  --name rg-easyplc-school \
  --location westeurope
```

### Étape 3 : Créer la base de données PostgreSQL

```bash
# Créer le serveur PostgreSQL Flexible
az postgres flexible-server create \
  --name easyplc-db-server \
  --resource-group rg-easyplc-school \
  --location westeurope \
  --admin-user easyplcadmin \
  --admin-password 'VotreMotDePasseSecurise123!' \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --storage-size 32 \
  --version 15

# Créer la base de données
az postgres flexible-server db create \
  --resource-group rg-easyplc-school \
  --server-name easyplc-db-server \
  --database-name easyplc_school

# Autoriser les services Azure
az postgres flexible-server firewall-rule create \
  --resource-group rg-easyplc-school \
  --name easyplc-db-server \
  --rule-name AllowAzureServices \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0
```

### Étape 4 : Créer l'App Service

```bash
# Créer un plan App Service
az appservice plan create \
  --name asp-easyplc-school \
  --resource-group rg-easyplc-school \
  --location westeurope \
  --sku B1 \
  --is-linux

# Créer l'application web
az webapp create \
  --name easyplc-school \
  --resource-group rg-easyplc-school \
  --plan asp-easyplc-school \
  --runtime "NODE|20-lts"
```

### Étape 5 : Configurer les variables d'environnement

```bash
# Récupérer la chaîne de connexion
DB_HOST="easyplc-db-server.postgres.database.azure.com"
DB_URL="postgresql://easyplcadmin:VotreMotDePasseSecurise123!@${DB_HOST}:5432/easyplc_school?sslmode=require"

# Configurer les variables
az webapp config appsettings set \
  --name easyplc-school \
  --resource-group rg-easyplc-school \
  --settings \
    NODE_ENV=production \
    DATABASE_URL="${DB_URL}" \
    JWT_SECRET="$(openssl rand -base64 32)" \
    CORS_ORIGINS="https://easyplc-school.azurewebsites.net"

# Configurer la commande de démarrage
az webapp config set \
  --name easyplc-school \
  --resource-group rg-easyplc-school \
  --startup-file "npm run prod:start"
```

### Étape 6 : Déployer l'application

**Option A : Déploiement via Git**

```bash
# Configurer le déploiement local Git
az webapp deployment source config-local-git \
  --name easyplc-school \
  --resource-group rg-easyplc-school

# Récupérer l'URL de déploiement
az webapp deployment list-publishing-credentials \
  --name easyplc-school \
  --resource-group rg-easyplc-school \
  --query scmUri

# Ajouter le remote et pousser
git remote add azure <URL-SCM>/easyplc-school.git
git push azure main
```

**Option B : Déploiement via GitHub Actions**

Créez `.github/workflows/azure-deploy.yml` :

```yaml
name: Deploy to Azure

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install and Build
        run: |
          npm ci
          npm run prod:build

      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v3
        with:
          app-name: 'easyplc-school'
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: .
```

Pour obtenir le profil de publication :
```bash
az webapp deployment list-publishing-profiles \
  --name easyplc-school \
  --resource-group rg-easyplc-school \
  --xml
```

Ajoutez le XML complet comme secret `AZURE_WEBAPP_PUBLISH_PROFILE` dans GitHub.

### Étape 7 : Initialiser la base de données

```bash
# Se connecter à l'application via SSH ou exécuter localement
DATABASE_URL="postgresql://..." npm run db:migrate
DATABASE_URL="postgresql://..." npm run db:seed
```

---

## Option 2 : Azure Container Instances (ACI)

### Déployer avec Docker

```bash
# Créer un registre de conteneurs
az acr create \
  --resource-group rg-easyplc-school \
  --name easyplcregistry \
  --sku Basic

# Se connecter au registre
az acr login --name easyplcregistry

# Builder et pousser l'image
docker build -t easyplcregistry.azurecr.io/easyplc-school:latest .
docker push easyplcregistry.azurecr.io/easyplc-school:latest

# Déployer sur ACI
az container create \
  --resource-group rg-easyplc-school \
  --name easyplc-school-container \
  --image easyplcregistry.azurecr.io/easyplc-school:latest \
  --registry-login-server easyplcregistry.azurecr.io \
  --registry-username $(az acr credential show --name easyplcregistry --query username -o tsv) \
  --registry-password $(az acr credential show --name easyplcregistry --query passwords[0].value -o tsv) \
  --dns-name-label easyplc-school \
  --ports 3001 \
  --environment-variables \
    NODE_ENV=production \
    DATABASE_URL="postgresql://..." \
    JWT_SECRET="votre-secret" \
    CORS_ORIGINS="http://easyplc-school.westeurope.azurecontainer.io:3001"
```

---

## Option 3 : Azure Kubernetes Service (AKS)

Pour les déploiements à grande échelle.

### Créer le cluster

```bash
az aks create \
  --resource-group rg-easyplc-school \
  --name aks-easyplc \
  --node-count 2 \
  --enable-addons monitoring \
  --generate-ssh-keys

az aks get-credentials \
  --resource-group rg-easyplc-school \
  --name aks-easyplc
```

### Fichiers Kubernetes

Créez `k8s/deployment.yaml` :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: easyplc-school
spec:
  replicas: 2
  selector:
    matchLabels:
      app: easyplc-school
  template:
    metadata:
      labels:
        app: easyplc-school
    spec:
      containers:
        - name: easyplc-school
          image: easyplcregistry.azurecr.io/easyplc-school:latest
          ports:
            - containerPort: 3001
          env:
            - name: NODE_ENV
              value: "production"
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: easyplc-secrets
                  key: database-url
            - name: JWT_SECRET
              valueFrom:
                secretKeyRef:
                  name: easyplc-secrets
                  key: jwt-secret
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"
          livenessProbe:
            httpGet:
              path: /api/health
              port: 3001
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /api/health
              port: 3001
            initialDelaySeconds: 5
            periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: easyplc-school-service
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 3001
  selector:
    app: easyplc-school
```

Déployer :
```bash
# Créer les secrets
kubectl create secret generic easyplc-secrets \
  --from-literal=database-url='postgresql://...' \
  --from-literal=jwt-secret='votre-secret'

# Appliquer la configuration
kubectl apply -f k8s/deployment.yaml
```

---

## Coûts estimés (EUR/mois)

| Service | Tier | Coût approximatif |
|---------|------|-------------------|
| App Service | B1 | ~13€ |
| PostgreSQL Flexible | B1ms | ~15€ |
| **Total App Service** | | **~28€** |
| | | |
| Container Instance | 1 vCPU, 1.5GB | ~25€ |
| PostgreSQL Flexible | B1ms | ~15€ |
| **Total ACI** | | **~40€** |
| | | |
| AKS | 2 nodes B2s | ~60€ |
| PostgreSQL Flexible | B1ms | ~15€ |
| **Total AKS** | | **~75€** |

*Utilisez le [calculateur Azure](https://azure.microsoft.com/pricing/calculator/) pour des estimations précises.*

---

## Bonnes pratiques Azure

1. **Sécurité**
   - Utilisez Azure Key Vault pour les secrets
   - Activez l'authentification Azure AD si possible
   - Configurez les groupes de sécurité réseau (NSG)

2. **Monitoring**
   - Activez Application Insights
   - Configurez des alertes sur les métriques clés

3. **Backup**
   - Activez les sauvegardes automatiques PostgreSQL
   - Configurez la rétention selon vos besoins

4. **Mise à l'échelle**
   - Utilisez l'autoscaling sur App Service
   - Configurez les règles basées sur CPU/mémoire

## Support

Pour toute question spécifique à Azure, consultez :
- [Documentation Azure App Service](https://docs.microsoft.com/azure/app-service/)
- [Documentation PostgreSQL Flexible](https://docs.microsoft.com/azure/postgresql/flexible-server/)
