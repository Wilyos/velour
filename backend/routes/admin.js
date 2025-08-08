const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
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
    subscription.confirmationToken = null; // Limpiar token usado
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

// @route   PUT /api/admin/subscriptions/:id/resend
// @desc    Reenviar email de confirmación con nuevo token
// @access  Private/Admin
router.put('/subscriptions/:id/resend', auth, isAdmin, async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      return res.status(404).json({ message: 'Suscripción no encontrada' });
    }

    if (subscription.isConfirmed) {
      return res.status(400).json({ message: 'La suscripción ya está confirmada' });
    }

    // Generar nuevo token de confirmación
    const crypto = require('crypto');
    const newToken = crypto.randomBytes(32).toString('hex');
    
    subscription.confirmationToken = newToken;
    await subscription.save();

    // Reenviar email de confirmación
    const emailService = require('../services/emailService');
    await emailService.sendConfirmationEmail(subscription.email, newToken);
    
    res.json({ 
      message: 'Email de confirmación reenviado exitosamente',
      subscription: {
        id: subscription._id,
        email: subscription.email,
        newToken: newToken.substring(0, 8) + '...' // Solo mostrar parte del token por seguridad
      }
    });

  } catch (error) {
    console.error('Error reenviando confirmación:', error);
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

    // Crear versión de texto simple del HTML
    const textContent = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

    const campaign = new EmailCampaign({
      title: subject, // Usar subject como título
      subject: subject,
      htmlContent: content, // Mapear content a htmlContent
      textContent: textContent, // Generar versión texto
      templateType: type, // Mapear type a templateType
      createdBy: req.user._id,
      scheduleFor: scheduleFor ? new Date(scheduleFor) : null
    });

    await campaign.save();

    res.status(201).json({
      message: 'Campaña creada exitosamente',
      campaign: {
        id: campaign._id,
        title: campaign.title,
        subject: campaign.subject,
        status: campaign.status,
        templateType: campaign.templateType,
        createdAt: campaign.createdAt
      }
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
            campaign.htmlContent,
            campaign.textContent
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
// @desc    Obtener todas las campañas con filtros
// @access  Private/Admin
router.get('/campaigns', auth, isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status; // 'draft', 'sent', 'sending', 'failed'

    // Construir filtros
    let filter = {};
    if (status && status !== 'all') {
      filter.status = status;
    }

    const total = await EmailCampaign.countDocuments(filter);
    const campaigns = await EmailCampaign.find(filter)
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

// @route   DELETE /api/admin/campaigns/:id
// @desc    Eliminar una campaña
// @access  Private/Admin
router.delete('/campaigns/:id', auth, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la campaña
    const campaign = await EmailCampaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaña no encontrada' });
    }

    // Solo permitir eliminar campañas en borrador o fallidas
    if (campaign.status === 'sending') {
      return res.status(400).json({ message: 'No se puede eliminar una campaña que se está enviando' });
    }

    await EmailCampaign.findByIdAndDelete(id);

    res.json({ message: 'Campaña eliminada exitosamente' });

  } catch (error) {
    console.error('Error eliminando campaña:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// @route   POST /api/admin/campaigns/:id/duplicate
// @desc    Duplicar una campaña
// @access  Private/Admin
router.post('/campaigns/:id/duplicate', auth, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la campaña original
    const originalCampaign = await EmailCampaign.findById(id);
    if (!originalCampaign) {
      return res.status(404).json({ message: 'Campaña no encontrada' });
    }

    // Crear una nueva campaña con los datos de la original
    const duplicatedCampaign = new EmailCampaign({
      subject: `${originalCampaign.subject} (Copia)`,
      htmlContent: originalCampaign.htmlContent,
      textContent: originalCampaign.textContent,
      templateType: originalCampaign.templateType,
      status: 'draft',
      createdBy: req.user._id,
      // No copiar estadísticas de envío
      sentCount: 0,
      deliveredCount: 0,
      failedCount: 0,
      openCount: 0,
      clickCount: 0
    });

    await duplicatedCampaign.save();
    await duplicatedCampaign.populate('createdBy', 'name email');

    res.status(201).json(duplicatedCampaign);

  } catch (error) {
    console.error('Error duplicando campaña:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// @route   POST /api/admin/campaigns/:id/resend
// @desc    Reenviar una campaña
// @access  Private/Admin
router.post('/campaigns/:id/resend', auth, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la campaña
    const campaign = await EmailCampaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaña no encontrada' });
    }

    // Solo permitir reenviar campañas enviadas o fallidas
    if (campaign.status === 'draft') {
      return res.status(400).json({ message: 'No se puede reenviar una campaña en borrador' });
    }

    if (campaign.status === 'sending') {
      return res.status(400).json({ message: 'La campaña ya se está enviando' });
    }

    // Actualizar estado a enviando
    campaign.status = 'sending';
    campaign.lastSentAt = new Date();
    await campaign.save();

    // Obtener todas las suscripciones activas
    const activeSubscriptions = await Subscription.find({ status: 'active' });

    if (activeSubscriptions.length === 0) {
      campaign.status = 'failed';
      await campaign.save();
      return res.status(400).json({ message: 'No hay suscriptores activos' });
    }

    // Configurar el transportador de nodemailer
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    let sentCount = 0;
    let failedCount = 0;

    // Enviar emails en lotes para evitar sobrecargar el servidor
    const batchSize = 10;
    for (let i = 0; i < activeSubscriptions.length; i += batchSize) {
      const batch = activeSubscriptions.slice(i, i + batchSize);
      
      const promises = batch.map(async (subscription) => {
        try {
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: subscription.email,
            subject: campaign.subject,
            html: campaign.htmlContent,
            text: campaign.textContent
          });
          sentCount++;
        } catch (error) {
          console.error(`Error enviando email a ${subscription.email}:`, error);
          failedCount++;
        }
      });

      await Promise.all(promises);
      
      // Pequeña pausa entre lotes
      if (i + batchSize < activeSubscriptions.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Actualizar estadísticas de la campaña
    campaign.sentCount += sentCount;
    campaign.failedCount += failedCount;
    campaign.deliveredCount = campaign.sentCount - campaign.failedCount;
    campaign.status = failedCount === activeSubscriptions.length ? 'failed' : 'sent';
    
    await campaign.save();

    res.json({
      message: 'Campaña reenviada exitosamente',
      campaign,
      stats: {
        sent: sentCount,
        failed: failedCount,
        total: activeSubscriptions.length
      }
    });

  } catch (error) {
    console.error('Error reenviando campaña:', error);
    
    // Actualizar estado a fallido en caso de error
    try {
      await EmailCampaign.findByIdAndUpdate(id, { status: 'failed' });
    } catch (updateError) {
      console.error('Error actualizando estado de campaña:', updateError);
    }
    
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;
