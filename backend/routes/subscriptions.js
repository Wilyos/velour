const express = require('express');
const { body, validationResult } = require('express-validator');
const Subscription = require('../models/Subscription');
const emailService = require('../services/emailService');

const router = express.Router();

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
        // Reenviar email de confirmación si no está confirmado
        await emailService.sendConfirmationEmail(subscription.email, subscription.confirmationToken);
        return res.json({ 
          message: 'Email de confirmación reenviado. Por favor revisa tu bandeja de entrada.' 
        });
      }
    }

    // Crear nueva suscripción
    subscription = new Subscription({ email });
    await subscription.save();

    // Enviar email de confirmación
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

    const subscription = await Subscription.findOne({ 
      confirmationToken: token,
      isConfirmed: false
    });

    if (!subscription) {
      return res.status(400).json({ 
        message: 'Token de confirmación inválido o suscripción ya confirmada' 
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
      message: 'Suscripción confirmada exitosamente. ¡Bienvenido a Velour!',
      subscription: {
        id: subscription._id,
        email: subscription.email,
        isConfirmed: subscription.isConfirmed,
        confirmedAt: subscription.confirmedAt
      }
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
