const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('🔄 Intentando conectar a MongoDB Atlas...');
    console.log('📍 URI:', process.env.MONGODB_URI ? 'Configurada' : 'NO CONFIGURADA');
    
    if (!process.env.MONGODB_URI) {
      console.log('❌ Error: MONGODB_URI no está configurada en .env');
      process.exit(1);
    }

    // Ocultar credenciales en el log
    const safeUri = process.env.MONGODB_URI.replace(/:([^:@]{1,})@/, ':***@');
    console.log('🔗 Conectando a:', safeUri);

    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✅ ¡Conexión exitosa a MongoDB Atlas!');
    console.log('📊 Base de datos:', mongoose.connection.name);
    console.log('🌐 Host:', mongoose.connection.host);
    console.log('🔌 Estado:', mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado');
    
    // Crear una colección de prueba
    const testCollection = mongoose.connection.db.collection('test');
    await testCollection.insertOne({ test: true, timestamp: new Date() });
    console.log('📝 Documento de prueba insertado exitosamente');
    
    // Limpiar el documento de prueba
    await testCollection.deleteOne({ test: true });
    console.log('🧹 Documento de prueba eliminado');
    
  } catch (error) {
    console.log('❌ Error de conexión:');
    
    if (error.message.includes('authentication failed')) {
      console.log('🔑 Problema de autenticación: Verifica usuario y contraseña');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('🌐 Problema de red: Verifica la URL del cluster');
    } else if (error.message.includes('IP not in whitelist')) {
      console.log('🚫 IP no autorizada: Configura el acceso de red en MongoDB Atlas');
    } else {
      console.log('📋 Error completo:', error.message);
    }
    
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Desconectado de MongoDB');
    process.exit(0);
  }
}

testConnection();
