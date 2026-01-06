# Installation and Deployment

> Complete installation and deployment guide for EasyPLC School

**Languages:** [Français](INSTALLATION.md) | English | [Español](INSTALLATION.es.md)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Installation](#local-installation)
- [Configuration](#configuration)
- [Database](#database)
- [Production Deployment](#production-deployment)
- [Docker](#docker)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

| Software | Version | Download |
|----------|---------|----------|
| Node.js | 18+ | [nodejs.org](https://nodejs.org/) |
| npm | 9+ | Included with Node.js |
| Git | 2+ | [git-scm.com](https://git-scm.com/) |

### Verify Prerequisites

```bash
# Check Node.js
node --version
# Should display v18.x.x or higher

# Check npm
npm --version
# Should display 9.x.x or higher

# Check Git
git --version
```

---

## Local Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/easyplc-school.git
cd easyplc-school
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your values
```

### 4. Initialize the Database

```bash
# Generate Prisma client
npx prisma generate

# Apply migrations
npx prisma migrate dev

# Seed with test data
npm run db:seed
```

### 5. Start the Application

```bash
# Development mode (frontend + backend)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

---

## Configuration

### Environment Variables

Create a `.env` file at the project root:

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET="your-very-long-and-secure-secret-key"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"

# Facebook OAuth (optional)
FACEBOOK_APP_ID="your-app-id"
FACEBOOK_APP_SECRET="your-app-secret"

# Microsoft OAuth (optional)
MICROSOFT_CLIENT_ID="your-client-id"
MICROSOFT_CLIENT_SECRET="your-client-secret"

# Server
PORT=3000
NODE_ENV="development"

# OAuth callback URLs
OAUTH_CALLBACK_URL="http://localhost:5173/auth/callback"
```

### OAuth Configuration

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Go to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Configure the consent screen
6. Add redirect URIs:
   - `http://localhost:3000/api/auth/google/callback` (dev)
   - `https://your-domain.com/api/auth/google/callback` (prod)

#### Facebook OAuth

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new application
3. Add the "Facebook Login" product
4. Configure valid OAuth redirect URIs

#### Microsoft OAuth

1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to "Azure Active Directory" > "App registrations"
3. Create a new registration
4. Configure redirect URIs

---

## Database

### SQLite (Development)

By default, the application uses SQLite for development:

```env
DATABASE_URL="file:./dev.db"
```

### Useful Prisma Commands

```bash
# Open Prisma Studio (GUI)
npx prisma studio

# Reset database
npx prisma migrate reset

# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations in production
npx prisma migrate deploy

# Regenerate client after schema changes
npx prisma generate
```

### Backup and Restore

```bash
# SQLite backup
cp prisma/dev.db prisma/backup.db

# Restore
cp prisma/backup.db prisma/dev.db
```

---

## Production Deployment

### Preparation

1. **Build the Application**

```bash
# Build frontend and backend
npm run build
```

2. **Production Environment Variables**

```env
NODE_ENV="production"
DATABASE_URL="file:./prod.db"
JWT_SECRET="randomly-generated-very-secure-key"
```

### Server Deployment

#### With PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start npm --name "easyplc-school" -- run start

# Configure auto-start
pm2 startup
pm2 save

# View logs
pm2 logs easyplc-school

# Restart
pm2 restart easyplc-school
```

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;

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

#### SSL with Certbot

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get a certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

### Cloud Platform Deployment

#### Railway

1. Connect your GitHub repository
2. Configure environment variables
3. Railway automatically detects Node.js

#### Render

1. Create a new "Web Service"
2. Connect the repository
3. Build command: `npm install && npm run build`
4. Start command: `npm run start`

#### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## Docker

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy dependency files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production

# Generate Prisma Client
RUN npx prisma generate

# Copy remaining code
COPY . .

# Build
RUN npm run build

# Expose port
EXPOSE 3000

# Start
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

### Docker Commands

```bash
# Build image
docker build -t easyplc-school .

# Start with docker-compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## Troubleshooting

### Common Errors

#### "Cannot find module '@prisma/client'"

```bash
# Regenerate Prisma client
npx prisma generate
```

#### "Database does not exist"

```bash
# Create and migrate the database
npx prisma migrate dev
```

#### "Port 3000 already in use"

```bash
# Find the process
lsof -i :3000

# Or change port in .env
PORT=3001
```

#### "OAuth callback error"

Verify that:
1. Callback URIs are correctly configured with the provider
2. CLIENT_ID and CLIENT_SECRET environment variables are correct
3. The callback URL matches exactly

### Logs and Debugging

```bash
# Debug mode
DEBUG=* npm run dev

# View Prisma queries
# Add to schema.prisma:
# generator client {
#   provider = "prisma-client-js"
#   previewFeatures = ["tracing"]
# }
```

### Support

- **Documentation**: [docs/](.)
- **GitHub Issues**: [github.com/issues](https://github.com/your-username/easyplc-school/issues)
- **Discussions**: [github.com/discussions](https://github.com/your-username/easyplc-school/discussions)
