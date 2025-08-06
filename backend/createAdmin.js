const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function createAdminUser() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/velour');
    console.log('Conectado a MongoDB');

    // Verificar si ya existe un admin
    const existingAdmin = await User.findOne({ role: 'admin' });
    
    if (existingAdmin) {
      console.log('Ya existe un usuario administrador:', existingAdmin.email);
      process.exit(0);
    }

    // Crear usuario administrador
    const adminUser = new User({
      name: 'Administrador Velour',
      email: 'admin@velour.com',
      password: 'VelourAdmin123!', // Cambiar en producción
      role: 'admin',
      isActive: true
    });

    await adminUser.save();
    console.log('Usuario administrador creado exitosamente');
    console.log('Email:', adminUser.email);
    console.log('Password: VelourAdmin123!');
    console.log('⚠️  IMPORTANTE: Cambia la contraseña después del primer login');

  } catch (error) {
    console.error('Error creando usuario administrador:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdminUser();
