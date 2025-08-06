# Velour Backend - Railway Deployment

Este backend está configurado para desplegarse en Railway.

## Variables de Entorno Requeridas en Railway

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/velour?retryWrites=true&w=majority
JWT_SECRET=tu_jwt_secret_muy_seguro
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password
FROM_NAME=Velour
FROM_EMAIL=tu_email@gmail.com
FRONTEND_URL=https://tu-dominio-frontend.netlify.app
NODE_ENV=production
PORT=5000
```

## Scripts Disponibles

- `npm start`: Iniciar servidor en producción
- `npm run dev`: Iniciar en modo desarrollo
- `npm run create-admin`: Crear usuario administrador

## Deployment en Railway

1. Conectar repositorio a Railway
2. Seleccionar directorio `backend` como root
3. Configurar variables de entorno
4. Railway detectará automáticamente el proyecto Node.js
