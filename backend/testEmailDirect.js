require('dotenv').config();

console.log('🔍 Verificando variables de entorno:');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✅ Configurado' : '❌ No configurado');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Configurado' : '❌ No configurado');
console.log('FROM_EMAIL:', process.env.FROM_EMAIL ? '✅ Configurado' : '❌ No configurado');

if (process.env.EMAIL_USER) {
  console.log('📧 Email configurado:', process.env.EMAIL_USER);
}

if (process.env.EMAIL_PASS) {
  console.log('🔑 Password configurada:', process.env.EMAIL_PASS.substring(0, 4) + '***');
}

// Probar nodemailer directamente
const nodemailer = require('nodemailer');

async function testDirectConnection() {
  try {
    console.log('\n🔗 Probando conexión directa con nodemailer...');
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Verificar la conexión
    console.log('🧪 Verificando conexión...');
    await transporter.verify();
    console.log('✅ Conexión a Gmail exitosa!');

    // Enviar email de prueba
    console.log('📬 Enviando email de prueba...');
    const info = await transporter.sendMail({
      from: `"Velour Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Enviar a ti mismo
      subject: '🧪 Test de configuración Velour',
      html: `
        <h2>¡Configuración exitosa!</h2>
        <p>El sistema de emails de Velour está funcionando correctamente.</p>
        <p>Fecha y hora: ${new Date().toLocaleString()}</p>
        <p>Este es un email de prueba automático.</p>
      `
    });

    console.log('✅ Email enviado exitosamente!');
    console.log('📩 Message ID:', info.messageId);
    console.log('📥 Revisa tu bandeja de entrada');

  } catch (error) {
    console.log('❌ Error en la prueba directa:');
    console.log('Código:', error.code);
    console.log('Mensaje:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n💡 Posibles soluciones:');
      console.log('1. Verifica que hayas activado la verificación en 2 pasos en Gmail');
      console.log('2. Verifica que uses una contraseña de aplicación (no tu contraseña normal)');
      console.log('3. Verifica que el email en EMAIL_USER sea correcto');
    }
  }
}

testDirectConnection();
