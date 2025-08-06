const emailService = require('./services/emailService');
require('dotenv').config();

async function testEmail() {
  try {
    console.log('🧪 Probando servicio de email...');
    console.log('📧 Configuración:');
    console.log('   Host:', process.env.EMAIL_HOST);
    console.log('   Puerto:', process.env.EMAIL_PORT);
    console.log('   Usuario:', process.env.EMAIL_USER);
    console.log('   De:', process.env.FROM_EMAIL);
    
    // Probar email de confirmación
    console.log('\n📬 Enviando email de prueba de confirmación...');
    const confirmationToken = 'test-token-123';
    const testEmail = 'correos.sistemaslit@gmail.com'; // Usar el mismo email para prueba
    
    const success = await emailService.sendConfirmationEmail(testEmail, confirmationToken);
    
    if (success) {
      console.log('✅ Email de confirmación enviado exitosamente!');
      console.log('📥 Revisa la bandeja de entrada de:', testEmail);
    } else {
      console.log('❌ Error enviando email de confirmación');
    }
    
  } catch (error) {
    console.log('❌ Error en el test de email:');
    console.log(error.message);
  }
}

testEmail();
