# Instalación y Despliegue

> Guía completa de instalación y despliegue de EasyPLC School

**Idiomas:** [Français](INSTALLATION.md) | [English](INSTALLATION.en.md) | Español

## Tabla de Contenidos

- [Requisitos previos](#requisitos-previos)
- [Instalación local](#instalación-local)
- [Configuración](#configuración)
- [Base de datos](#base-de-datos)
- [Despliegue en producción](#despliegue-en-producción)
- [Docker](#docker)
- [Solución de problemas](#solución-de-problemas)

---

## Requisitos previos

### Software requerido

| Software | Versión | Descarga |
|----------|---------|----------|
| Node.js | 18+ | [nodejs.org](https://nodejs.org/) |
| npm | 9+ | Incluido con Node.js |
| Git | 2+ | [git-scm.com](https://git-scm.com/) |

### Verificar requisitos

```bash
# Verificar Node.js
node --version
# Debe mostrar v18.x.x o superior

# Verificar npm
npm --version
# Debe mostrar 9.x.x o superior

# Verificar Git
git --version
```

---

## Instalación local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/easyplc-school.git
cd easyplc-school
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar el entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar el archivo .env con sus valores
```

### 4. Inicializar la base de datos

```bash
# Generar el cliente Prisma
npx prisma generate

# Aplicar migraciones
npx prisma migrate dev

# Poblar con datos de prueba
npm run db:seed
```

### 5. Iniciar la aplicación

```bash
# Modo desarrollo (frontend + backend)
npm run dev
```

La aplicación estará disponible en:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

---

## Configuración

### Variables de entorno

Cree un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET="su-clave-secreta-muy-larga-y-segura"

# OAuth Google (opcional)
GOOGLE_CLIENT_ID="su-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="su-client-secret"

# OAuth Facebook (opcional)
FACEBOOK_APP_ID="su-app-id"
FACEBOOK_APP_SECRET="su-app-secret"

# OAuth Microsoft (opcional)
MICROSOFT_CLIENT_ID="su-client-id"
MICROSOFT_CLIENT_SECRET="su-client-secret"

# Servidor
PORT=3000
NODE_ENV="development"

# URLs de callback OAuth
OAUTH_CALLBACK_URL="http://localhost:5173/auth/callback"
```

### Configuración OAuth

#### Google OAuth

1. Acceda a [Google Cloud Console](https://console.cloud.google.com/)
2. Cree un nuevo proyecto o seleccione uno existente
3. Vaya a "APIs & Services" > "Credentials"
4. Haga clic en "Create Credentials" > "OAuth client ID"
5. Configure la pantalla de consentimiento
6. Agregue las URIs de redirección:
   - `http://localhost:3000/api/auth/google/callback` (dev)
   - `https://su-dominio.com/api/auth/google/callback` (prod)

#### Facebook OAuth

1. Acceda a [Facebook Developers](https://developers.facebook.com/)
2. Cree una nueva aplicación
3. Agregue el producto "Facebook Login"
4. Configure las URIs de redirección OAuth válidas

#### Microsoft OAuth

1. Acceda a [Azure Portal](https://portal.azure.com/)
2. Vaya a "Azure Active Directory" > "App registrations"
3. Cree un nuevo registro
4. Configure las URIs de redirección

---

## Base de datos

### SQLite (desarrollo)

Por defecto, la aplicación utiliza SQLite para desarrollo:

```env
DATABASE_URL="file:./dev.db"
```

### Comandos Prisma útiles

```bash
# Ver Prisma Studio (interfaz gráfica)
npx prisma studio

# Reiniciar la base de datos
npx prisma migrate reset

# Crear una nueva migración
npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy

# Regenerar el cliente después de modificar el esquema
npx prisma generate
```

### Copia de seguridad y restauración

```bash
# Copia de seguridad SQLite
cp prisma/dev.db prisma/backup.db

# Restauración
cp prisma/backup.db prisma/dev.db
```

---

## Despliegue en producción

### Preparación

1. **Build de la aplicación**

```bash
# Build frontend y backend
npm run build
```

2. **Variables de entorno de producción**

```env
NODE_ENV="production"
DATABASE_URL="file:./prod.db"
JWT_SECRET="clave-muy-segura-generada-aleatoriamente"
```

### Despliegue en servidor

#### Con PM2

```bash
# Instalación global de PM2
npm install -g pm2

# Iniciar la aplicación
pm2 start npm --name "easyplc-school" -- run start

# Configurar inicio automático
pm2 startup
pm2 save

# Ver logs
pm2 logs easyplc-school

# Reiniciar
pm2 restart easyplc-school
```

#### Configuración Nginx

```nginx
server {
    listen 80;
    server_name su-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### SSL con Certbot

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Obtener un certificado
sudo certbot --nginx -d su-dominio.com

# Renovación automática
sudo certbot renew --dry-run
```

### Despliegue en plataformas cloud

#### Railway

1. Conecte su repositorio GitHub
2. Configure las variables de entorno
3. Railway detecta automáticamente Node.js

#### Render

1. Cree un nuevo "Web Service"
2. Conecte el repositorio
3. Build command: `npm install && npm run build`
4. Start command: `npm run start`

#### Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

---

## Docker

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm ci --only=production

# Generar Prisma Client
RUN npx prisma generate

# Copiar el resto del código
COPY . .

# Build
RUN npm run build

# Exponer puerto
EXPOSE 3000

# Iniciar
CMD ["npm", "run", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=file:/app/prisma/prod.db
      - JWT_SECRET=${JWT_SECRET}
    volumes:
      - ./prisma/prod.db:/app/prisma/prod.db
    restart: unless-stopped
```

### Comandos Docker

```bash
# Construir imagen
docker build -t easyplc-school .

# Iniciar con docker-compose
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

---

## Solución de problemas

### Errores comunes

#### "Cannot find module '@prisma/client'"

```bash
# Regenerar el cliente Prisma
npx prisma generate
```

#### "Database does not exist"

```bash
# Crear y migrar la base de datos
npx prisma migrate dev
```

#### "Port 3000 already in use"

```bash
# Encontrar el proceso
lsof -i :3000

# O cambiar el puerto en .env
PORT=3001
```

#### "OAuth callback error"

Verifique que:
1. Las URIs de callback estén correctamente configuradas en el proveedor
2. Las variables de entorno CLIENT_ID y CLIENT_SECRET sean correctas
3. La URL de callback coincida exactamente

### Logs y debugging

```bash
# Modo debug
DEBUG=* npm run dev

# Ver consultas Prisma
# Agregue en schema.prisma:
# generator client {
#   provider = "prisma-client-js"
#   previewFeatures = ["tracing"]
# }
```

### Soporte

- **Documentación**: [docs/](.)
- **Issues GitHub**: [github.com/issues](https://github.com/tu-usuario/easyplc-school/issues)
- **Discusiones**: [github.com/discussions](https://github.com/tu-usuario/easyplc-school/discussions)
