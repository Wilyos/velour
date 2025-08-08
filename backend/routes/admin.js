const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth } = require('./auth');
const Subscription = require('../models/Subscription');
const EmailCampaign = require('../models/EmailCampaign');
const User = require('../models/User');
const emailService = require('../services/emailService');

const router = express.Router();

// Middleware para verificar que sea admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado. Se requieren permisos de administrador.' });
  }
  next();
};

// @route   GET /api/admin/dashboard
// @desc    Obtener datos del dashboard de admin
// @access  Private/Admin
router.get('/dashboard', auth, isAdmin, async (req, res) => {
  try {
    // Estadísticas básicas
    const totalSubscriptions = await Subscription.countDocuments();
    const confirmedSubscriptions = await Subscription.countDocuments({ 
      isConfirmed: true,
      isActive: true
    });
    const totalCampaigns = await EmailCampaign.countDocuments();
    const activeCampaigns = await EmailCampaign.countDocuments({ 
      status: 'sent'
    });

    // Suscripciones recientes (últimos 7 días)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const recentSubscriptions = await Subscription.find({
      createdAt: { $gte: weekAgo }
    }).sort({ createdAt: -1 }).limit(10);

    // Campañas recientes
    const recentCampaigns = await EmailCampaign.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      stats: {
        totalSubscriptions,
        confirmedSubscriptions,
        totalCampaigns,
        activeCampaigns,
        conversionRate: totalSubscriptions > 0 ? 
          Math.round((confirmedSubscriptions / totalSubscriptions) * 100) : 0
      },
      recentSubscriptions,
      recentCampaigns
    });

  } catch (error) {
    console.error('Error en dashboard:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// @route   GET /api/admin/subscriptions
// @desc    Obtener todas las suscripciones con paginación
// @access  Private/Admin
router.get('/subscriptions', auth, isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status; // 'confirmed', 'pending', 'unsubscribed'
    const search = req.query.search;

    // Construir filtros
    let filter = {};
    if (status === 'confirmed') {
      filter = { isConfirmed: true, isActive: true };
    } else if (status === 'pending') {
      filter = { isConfirmed: false };
    } else if (status === 'unsubscribed') {
      filter = { isActive: false };
    }

    if (search) {
      filter.email = { $regex: search, $options: 'i' };
    }

    const total = await Subscription.countDocuments(filter);
    const subscriptions = await Subscription.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    res.json({
      subscriptions,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit
      }
    });

  } catch (error) {
    console.error('Error obteniendo suscripciones:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// @route   DELETE /api/admin/subscriptions/:id
// @desc    Eliminar una suscripción
// @access  Private/Admin
router.delete('/subscriptions/:id', auth, isAdmin, async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      return res.status(404).json({ message: 'Suscripción no encontrada' });
    }

    await Subscription.findByIdAndDelete(req.params.id);
    
    res.json({ 
      message: 'Suscripción eliminada exitosamente',
      deletedSubscription: {
        id: subscription._id,
        email: subscription.email
      }
    });

  } catch (error) {
    console.error('Error eliminando suscripción:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// @route   DELETE /api/admin/subscriptions/pending
// @desc    Eliminar todas las suscripciones pendientes
// @access  Private/Admin
router.delete('/subscriptions/pending', auth, isAdmin, async (req, res) => {
  try {
    const result = await Subscription.deleteMany({ isConfirmed: false });
    
    res.json({ 
      message: `${result.deletedCount} suscripciones pendientes eliminadas exitosamente`,
      deletedCount: result.deletedCount
    });

  } catch (error) {
    console.error('Error eliminando suscripciones pendientes:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// @route   PUT /api/admin/subscriptions/:id/confirm
// @desc    Confirmar manualmente una suscripción
// @access  Private/Admin
router.put('/subscriptions/:id/confirm', auth, isAdmin, async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      return res.status(404).json({ message: 'Suscripción no encontrada' });
    }

    subscription.isConfirmed = true;
    subscription.isActive = true;
    subscription.confirmedAt = new Date();
    await subscription.save();
    
    res.json({ 
      message: 'Suscripción confirmada exitosamente',
      subscription
    });

  } catch (error) {
    console.error('Error confirmando suscripción:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});
        limit
      }
    });

  } catch (error) {
    console.error('Error obteniendo suscripciones:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// @route   DELETE /api/admin/subscriptions/:id
// @desc    Eliminar una suscripción
// @access  Private/Admin
router.delete('/subscriptions/:id', auth, isAdmin, async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      return res.status(404).json({ message: 'Suscripción no encontrada' });
    }

    await Subscription.findByIdAndDelete(req.params.id);

    res.json({ message: 'Suscripción eliminada exitosamente' });

  } catch (error) {
    console.error('Error eliminando suscripción:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// @route   POST /api/admin/campaigns
// @desc    Crear una nueva campaña de email
// @access  Private/Admin
router.post('/campaigns', [
  auth,
  isAdmin,
  body('subject').notEmpty().withMessage('El asunto es requerido'),
  body('content').notEmpty().withMessage('El contenido es requerido'),
  body('type').isIn(['newsletter', 'promotion', 'announcement']).withMessage('Tipo de campaña inválido')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { subject, content, type, scheduleFor } = req.body;

    const campaign = new EmailCampaign({
      subject,
      content,
      type,
      createdBy: req.user._id,
      scheduleFor: scheduleFor ? new Date(scheduleFor) : null
    });

    await campaign.save();

    res.status(201).json({
      message: 'Campaña creada exitosamente',
      campaign
    });

  } catch (error) {
    console.error('Error creando campaña:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// @route   POST /api/admin/campaigns/:id/send
// @desc    Enviar una campaña de email
// @access  Private/Admin
router.post('/campaigns/:id/send', auth, isAdmin, async (req, res) => {
  try {
    const campaign = await EmailCampaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaña no encontrada' });
    }

    if (campaign.status === 'sent') {
      return res.status(400).json({ message: 'Esta campaña ya fue enviada' });
    }

    // Obtener suscriptores activos y confirmados
    const subscribers = await Subscription.find({
      isConfirmed: true,
      isActive: true
    });

    if (subscribers.length === 0) {
      return res.status(400).json({ message: 'No hay suscriptores activos' });
    }

    // Actualizar estado de la campaña
    campaign.status = 'sending';
    campaign.sentAt = new Date();
    campaign.recipientCount = subscribers.length;
    await campaign.save();

    // Enviar emails (en producción esto debería ser un job en cola)
    try {
      let successCount = 0;
      let failureCount = 0;

      for (const subscriber of subscribers) {
        try {
          await emailService.sendCampaignEmail(
            subscriber.email, 
            campaign.subject, 
            campaign.content,
            campaign.type
          );
          successCount++;
        } catch (emailError) {
          console.error(`Error enviando a ${subscriber.email}:`, emailError);
          failureCount++;
        }
      }

      // Actualizar estadísticas de la campaña
      campaign.status = 'sent';
      campaign.successCount = successCount;
      campaign.failureCount = failureCount;
      await campaign.save();

      res.json({
        message: 'Campaña enviada exitosamente',
        stats: {
          total: subscribers.length,
          success: successCount,
          failures: failureCount
        }
      });

    } catch (error) {
      campaign.status = 'failed';
      await campaign.save();
      throw error;
    }

  } catch (error) {
    console.error('Error enviando campaña:', error);
    res.status(500).json({ message: 'Error del servidor al enviar la campaña' });
  }
});

// @route   GET /api/admin/campaigns
// @desc    Obtener todas las campañas
// @access  Private/Admin
router.get('/campaigns', auth, isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const total = await EmailCampaign.countDocuments();
    const campaigns = await EmailCampaign.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    res.json({
      campaigns,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit
      }
    });

  } catch (error) {
    console.error('Error obteniendo campañas:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// @route   DELETE /api/admin/campaigns/:id
// @desc    Eliminar una campaña
// @access  Private/Admin
router.delete('/campaigns/:id', auth, isAdmin, async (req, res) => {
  try {
    const campaign = await EmailCampaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaña no encontrada' });
    }

    if (campaign.status === 'sent' || campaign.status === 'sending') {
      return res.status(400).json({ 
        message: 'No se puede eliminar una campaña que ya fue enviada o se está enviando' 
      });
    }

    await EmailCampaign.findByIdAndDelete(req.params.id);

    res.json({ message: 'Campaña eliminada exitosamente' });

  } catch (error) {
    console.error('Error eliminando campaña:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// @route   GET /api/admin/export/subscriptions
// @desc    Exportar suscripciones a CSV
// @access  Private/Admin
router.get('/export/subscriptions', auth, isAdmin, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ isActive: true })
      .sort({ createdAt: -1 });

    // Crear CSV
    let csv = 'Email,Estado,Fecha de Suscripción,Fecha de Confirmación\n';
    subscriptions.forEach(sub => {
      csv += `${sub.email},${sub.isConfirmed ? 'Confirmado' : 'Pendiente'},${sub.createdAt.toISOString()},${sub.confirmedAt ? sub.confirmedAt.toISOString() : 'N/A'}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=suscripciones.csv');
    res.send(csv);

  } catch (error) {
    console.error('Error exportando suscripciones:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;
