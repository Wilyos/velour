# Velour - Sistema de Suscripciones y Administración

Sistema completo de suscripciones por email con panel de administración para gestión de campañas y suscriptores.

## 🚀 Características

### Frontend
- ✅ Diseño responsive optimizado
- ✅ Sistema de búsqueda global
- ✅ Navegación por anclaje
- ✅ Formulario de suscripción integrado
- ✅ Panel de administración moderno

### Backend
- ✅ API REST completa
- ✅ Autenticación JWT
- ✅ Base de datos MongoDB
- ✅ Sistema de emails con plantillas HTML
- ✅ Gestión de campañas de email
- ✅ Panel de estadísticas

## 📋 Prerrequisitos

- Node.js (v16 o superior)
- MongoDB Atlas (cuenta gratuita)
- Gmail o servicio SMTP para emails

## 🛠️ Configuración

### 1. Backend

1. **Instalar dependencias:**
   ```bash
   cd backend
   npm install
   ```

2. **Configurar variables de entorno:**
   Edita el archivo `backend/.env`:
   ```env
   # MongoDB Atlas
   MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/velour?retryWrites=true&w=majority
   
   # JWT Secret (genera uno único)
   JWT_SECRET=tu_jwt_secret_muy_seguro_aqui
   
   # Email Configuration (Gmail)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=tu_email@gmail.com
   EMAIL_PASS=tu_app_password_de_gmail
   FROM_NAME=Velour
   FROM_EMAIL=tu_email@gmail.com
   
   # Frontend URL
   FRONTEND_URL=http://localhost:5173
   
   # Puerto del servidor
   PORT=5000
   ```

3. **Configurar MongoDB Atlas:**
   - Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Crear un cluster gratuito
   - Obtener la string de conexión
   - Reemplazar en `MONGODB_URI`

4. **Configurar Gmail para emails:**
   - Activar verificación en 2 pasos en Gmail
   - Generar contraseña de aplicación
   - Usar la contraseña de aplicación en `EMAIL_PASS`

5. **Crear usuario administrador:**
   ```bash
   npm run create-admin
   ```

6. **Iniciar servidor:**
   ```bash
   npm run dev
   ```

### 2. Frontend

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar desarrollo:**
   ```bash
   npm run dev
   ```

## 🔐 Acceso de Administración

Una vez configurado, puedes acceder al panel de administración:

- **URL:** http://localhost:5173/admin/login
- **Usuario:** admin@velour.com
- **Contraseña:** VelourAdmin123!

⚠️ **Importante:** Cambia la contraseña después del primer login.

## 📊 Funcionalidades del Panel Admin

### Dashboard
- Estadísticas de suscripciones
- Tasa de conversión
- Actividad reciente
- Resumen de campañas

### Gestión de Suscripciones
- Lista de todos los suscriptores
- Filtros por estado (confirmado, pendiente, cancelado)
- Búsqueda por email
- Exportación a CSV

### Gestión de Campañas
- Crear nuevas campañas de email
- Plantillas HTML personalizables
- Envío masivo a suscriptores
- Seguimiento de estadísticas de envío

## 🌐 API Endpoints

### Autenticación
- `POST /api/auth/login` - Login de administrador
- `GET /api/auth/me` - Información del usuario actual
- `POST /api/auth/change-password` - Cambiar contraseña

### Suscripciones
- `POST /api/subscriptions/subscribe` - Nueva suscripción
- `GET /api/subscriptions/confirm/:token` - Confirmar suscripción
- `POST /api/subscriptions/unsubscribe` - Cancelar suscripción
- `GET /api/subscriptions/stats` - Estadísticas

### Administración
- `GET /api/admin/dashboard` - Datos del dashboard
- `GET /api/admin/subscriptions` - Lista de suscripciones
- `POST /api/admin/campaigns` - Crear campaña
- `POST /api/admin/campaigns/:id/send` - Enviar campaña
- `GET /api/admin/export/subscriptions` - Exportar suscripciones

## 📧 Sistema de Emails

### Emails Automáticos
1. **Confirmación de suscripción** - Se envía inmediatamente
2. **Email de bienvenida** - Se envía tras confirmación
3. **Campañas personalizadas** - Desde panel admin

### Plantillas Incluidas
- Diseño responsive
- Colores de marca Velour
- Botones de acción
- Links de cancelación de suscripción

## 🎨 Personalización

### Colores de Marca
```css
:root {
  --primary: #8B5A3C;
  --secondary: #D4A574;
}
```

### Tipos de Campaña
- `newsletter` - Newsletter regular
- `promotion` - Ofertas y promociones
- `announcement` - Anuncios importantes

## 📁 Estructura del Proyecto

```
velour/
├── src/                    # Frontend React
│   ├── components/         # Componentes reutilizables
│   ├── Pages/             # Páginas de la aplicación
│   ├── contexts/          # Context API
│   └── assets/           # Imágenes y archivos estáticos
├── backend/              # Backend Node.js
│   ├── models/           # Modelos de MongoDB
│   ├── routes/           # Rutas de la API
│   ├── services/         # Servicios (emails, etc.)
│   └── server.js         # Servidor principal
└── public/               # Archivos públicos
```

## 🚀 Despliegue

### Frontend (Vercel/Netlify)
1. Hacer build: `npm run build`
2. Subir carpeta `dist`
3. Configurar variable de entorno para API

### Backend (Railway/Heroku)
1. Subir código a GitHub
2. Conectar con plataforma de deploy
3. Configurar variables de entorno
4. Ejecutar `npm run create-admin`

## 🔧 Solución de Problemas

### Error de conexión a MongoDB
- Verificar string de conexión
- Comprobar IP whitelist en MongoDB Atlas
- Verificar usuario y contraseña

### Emails no se envían
- Verificar configuración SMTP
- Comprobar contraseña de aplicación de Gmail
- Revisar logs del servidor

### Error 404 en rutas admin
- Verificar que el backend esté corriendo
- Comprobar proxy en vite.config.js
- Verificar URLs en requests

## 📞 Soporte

Para soporte técnico o preguntas sobre la implementación, consulta la documentación del código o contacta al equipo de desarrollo.

---

**¡Sistema completo de suscripciones implementado exitosamente! 🎉**
