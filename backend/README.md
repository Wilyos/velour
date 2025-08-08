# Velour Backend - Railway D# Email Service (YA CONFIGURADO)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=correos.sistemaslit@gmail.com
EMAIL_PASS=rsbjeqngrkoaayat
FROM_NAME=Velour
FROM_EMAIL=velourvitalize@gmail.com

# Frontend URL (ACTUALIZAR CON TU DOMINIO DE NETLIFY)
FRONTEND_URL=https://velourvitalize.com

# Producción (IMPORTANTE - AGREGAR ESTA VARIABLE)
NODE_ENV=productionEste backend está configurado para desplegarse en Railway.

## Configuración Paso a Paso en Railway

### 1. Crear Nuevo Proyecto en Railway
1. Ve a [Railway.app](https://railway.app/) y haz login
2. Click en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Elige el repositorio `Wilyos/velour`

### 2. Configurar Root Directory
**¡CRÍTICO!** Después de crear el proyecto:
1. Ve a Settings del proyecto
2. En "Root Directory" escribe: `backend`
3. Guarda los cambios

### 3. Variables de Entorno Requeridas
Ve a Variables tab y agrega estas variables:

```env
# MongoDB Atlas (YA CONFIGURADO)
MONGODB_URI=mongodb+srv://velour-admin:Z0WJCuS00uh1Mzgc@cluster0.jaztxfn.mongodb.net/velour?retryWrites=true&w=majority&appName=Cluster0

# JWT Secret (YA GENERADO)
JWT_SECRET=8cf35f038fc6c075847ac554042cf645162a57c62dc0aaf09f360204bc880645c5929de0eb58ff3635cdbada02e00f9e79a31eb4ec7f253e1fddecda3975876f

# Email Service (YA CONFIGURADO)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=correos.sistemaslit@gmail.com
EMAIL_PASS=rsbjeqngrkoaayat
FROM_NAME=Velour
FROM_EMAIL=velourvitalize@gmail.com

# Frontend URL (ACTUALIZAR CON TU DOMINIO DE NETLIFY)
FRONTEND_URL=https://tu-dominio-velour.netlify.app

# Producción
NODE_ENV=production

# Admin por defecto (OPCIONAL)
ADMIN_EMAIL=admin@velour.com
ADMIN_PASSWORD=admin123
```

### 4. Deployar
1. Railway automáticamente detectará los cambios del último commit
2. El deployment usará el `nixpacks.toml` configurado
3. Una vez desplegado, obtendrás una URL como: `https://tu-proyecto.railway.app`

## Scripts Disponibles

- `npm start`: Iniciar servidor en producción
- `npm run dev`: Iniciar en modo desarrollo
- `npm run create-admin`: Crear usuario administrador

## Health Check

El backend incluye un endpoint de health check en:
`GET /api/health`

## Archivos de Configuración

- `nixpacks.toml`: Configuración de build para Railway
- `railway.json`: Configuración específica de Railway (en raíz del proyecto)
- `.gitignore`: Excluye archivos innecesarios del deployment
