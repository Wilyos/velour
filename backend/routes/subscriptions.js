const express = require('express');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const Subscription = require('../models/Subscription');
const emailService = require('../services/emailService');

const router = express.Router();

// @route   GET /api/subscriptions/debug-env
// @desc    Debug endpoint para verificar variables de entorno
// @access  Public (temporal para debugging)
router.get('/debug-env', (req, res) => {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? (process.env.FRONTEND_URL || 'https://velourvitalize.com')
    : 'http://localhost:5173';
    
  res.json({
    NODE_ENV: process.env.NODE_ENV,
    FRONTEND_URL: process.env.FRONTEND_URL,
    baseUrl: baseUrl,
    confirmUrl: `${baseUrl}/confirm-subscription/test-token`
  });
});

// @route   POST /api/subscriptions/subscribe
// @desc    Suscribirse al newsletter
// @access  Public
router.post('/subscribe', [
  body('email').isEmail().normalizeEmail()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    // Verificar si ya existe la suscripción
    let subscription = await Subscription.findOne({ email });
    
    if (subscription) {
      if (subscription.isConfirmed) {
        return res.status(400).json({ 
          message: 'Este email ya está suscrito' 
        });
      } else {
        // Generar nuevo token si no tiene o si el actual es null
        if (!subscription.confirmationToken) {
          subscription.confirmationToken = crypto.randomBytes(32).toString('hex');
          await subscription.save();
        }
        
        // Reenviar email de confirmación
        await emailService.sendConfirmationEmail(subscription.email, subscription.confirmationToken);
        return res.json({ 
          message: 'Email de confirmación reenviado. Por favor revisa tu bandeja de entrada.' 
        });
      }
    }

    // Crear nueva suscripción con token de confirmación
    const confirmationToken = crypto.randomBytes(32).toString('hex');
    subscription = new Subscription({ 
      email,
      confirmationToken: confirmationToken 
    });
    await subscription.save();

    // Enviar email de confirmación
    console.log('Sending confirmation email to:', subscription.email, 'with token:', subscription.confirmationToken?.substring(0, 8) + '...');
    await emailService.sendConfirmationEmail(subscription.email, subscription.confirmationToken);

    res.status(201).json({
      message: 'Suscripción creada. Por favor revisa tu email para confirmar la suscripción.',
      subscription: {
        id: subscription._id,
        email: subscription.email,
        isConfirmed: subscription.isConfirmed
      }
    });

  } catch (error) {
    console.error('Error en suscripción:', error);
    res.status(500).json({ message: 'Error del servidor. Inténtalo más tarde.' });
  }
});

// @route   GET /api/subscriptions/confirm/:token
// @desc    Confirmar suscripción
// @access  Public
router.get('/confirm/:token', async (req, res) => {
  try {
    const { token } = req.params;

    // Primero buscar cualquier suscripción con ese token (confirmada o no)
    let subscription = await Subscription.findOne({ 
      confirmationToken: token
    });

    // Si no se encuentra, buscar si hay una suscripción ya confirmada con ese token borrado
    if (!subscription) {
      // El token podría haber sido borrado después de la confirmación
      subscription = await Subscription.findOne({ 
        confirmationToken: null,
        isConfirmed: true
      });
      
      if (subscription) {
        // Si hay una suscripción confirmada, probablemente este token ya fue usado
        return res.json({
          message: '¡Tu suscripción ya está confirmada! Ya formas parte de la familia Velour.',
          subscription: {
            id: subscription._id,
            email: subscription.email,
            isConfirmed: subscription.isConfirmed,
            confirmedAt: subscription.confirmedAt
          },
          alreadyConfirmed: true
        });
      }
      
      return res.status(400).json({ 
        message: 'Token de confirmación inválido. El enlace puede haber expirado.' 
      });
    }

    // Si la suscripción ya está confirmada
    if (subscription.isConfirmed) {
      return res.json({
        message: '¡Tu suscripción ya está confirmada! Ya formas parte de la familia Velour.',
        subscription: {
          id: subscription._id,
          email: subscription.email,
          isConfirmed: subscription.isConfirmed,
          confirmedAt: subscription.confirmedAt
        },
        alreadyConfirmed: true
      });
    }

    // Confirmar suscripción
    subscription.isConfirmed = true;
    subscription.confirmedAt = new Date();
    subscription.confirmationToken = null; // Limpiar el token
    await subscription.save();

    // Enviar email de bienvenida
    await emailService.sendWelcomeEmail(subscription.email);

    res.json({
      message: '¡Suscripción confirmada exitosamente! Bienvenido/a a Velour.',
      subscription: {
        id: subscription._id,
        email: subscription.email,
        isConfirmed: subscription.isConfirmed,
        confirmedAt: subscription.confirmedAt
      },
      alreadyConfirmed: false
    });

  } catch (error) {
    console.error('Error en confirmación:', error);
    res.status(500).json({ message: 'Error del servidor. Inténtalo más tarde.' });
  }
});

// @route   POST /api/subscriptions/unsubscribe
// @desc    Cancelar suscripción
// @access  Public
router.post('/unsubscribe', [
  body('email').isEmail().normalizeEmail()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    const subscription = await Subscription.findOne({ email });
    
    if (!subscription) {
      return res.status(404).json({ 
        message: 'No se encontró suscripción con este email' 
      });
    }

    // Marcar como cancelada en lugar de eliminar
    subscription.isActive = false;
    subscription.unsubscribedAt = new Date();
    await subscription.save();

    res.json({
      message: 'Suscripción cancelada exitosamente'
    });

  } catch (error) {
    console.error('Error al cancelar suscripción:', error);
    res.status(500).json({ message: 'Error del servidor. Inténtalo más tarde.' });
  }
});

// @route   GET /api/subscriptions/stats
// @desc    Obtener estadísticas de suscripciones (solo para admin)
// @access  Private/Admin
router.get('/stats', async (req, res) => {
  try {
    const totalSubscriptions = await Subscription.countDocuments();
    const confirmedSubscriptions = await Subscription.countDocuments({ 
      isConfirmed: true,
      isActive: true
    });
    const pendingSubscriptions = await Subscription.countDocuments({ 
      isConfirmed: false 
    });
    const unsubscribedCount = await Subscription.countDocuments({ 
      isActive: false 
    });

    // Suscripciones por mes (últimos 6 meses)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyStats = await Subscription.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      stats: {
        total: totalSubscriptions,
        confirmed: confirmedSubscriptions,
        pending: pendingSubscriptions,
        unsubscribed: unsubscribedCount,
        activeRate: totalSubscriptions > 0 ? 
          Math.round((confirmedSubscriptions / totalSubscriptions) * 100) : 0
      },
      monthlyStats
    });

  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;
