const mongoose = require('mongoose');
const crypto = require('crypto');
require('dotenv').config();

const Subscription = require('./models/Subscription');

async function fixSubscriptionsWithoutTokens() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/velour');
    console.log('Conectado a MongoDB');

    // Buscar suscripciones sin token de confirmación
    const subscriptionsWithoutToken = await Subscription.find({
      $or: [
        { confirmationToken: null },
        { confirmationToken: { $exists: false } },
        { confirmationToken: '' }
      ],
      isConfirmed: false
    });

    console.log(`Encontradas ${subscriptionsWithoutToken.length} suscripciones sin token`);

    // Generar tokens para cada suscripción
    for (const subscription of subscriptionsWithoutToken) {
      const newToken = crypto.randomBytes(32).toString('hex');
      subscription.confirmationToken = newToken;
      await subscription.save();
      
      console.log(`Token generado para ${subscription.email}: ${newToken.substring(0, 8)}...`);
    }

    console.log('✅ Todas las suscripciones han sido corregidas');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  }
}

// Ejecutar el script
if (require.main === module) {
  fixSubscriptionsWithoutTokens();
}

module.exports = fixSubscriptionsWithoutTokens;
