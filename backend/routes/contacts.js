const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const emailService = require('../services/emailService');

const router = express.Router();

// @route   POST /api/contacts/submit
// @desc    Enviar formulario de contacto
// @access  Public
router.post('/submit', [
  body('fullName').notEmpty().trim().withMessage('El nombre completo es requerido'),
  body('documentNumber').notEmpty().trim().withMessage('El número de documento es requerido'),
  body('email').isEmail().normalizeEmail().withMessage('Email válido es requerido'),
  body('phone').notEmpty().trim().withMessage('El teléfono es requerido'),
  body('message').notEmpty().trim().withMessage('El mensaje es requerido')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        message: 'Datos inválidos',
        errors: errors.array() 
      });
    }

    const { fullName, documentNumber, email, phone, message } = req.body;

    // Crear nuevo contacto
    const newContact = new Contact({
      fullName,
      documentNumber,
      email,
      phone,
      message
    });

    await newContact.save();

    // Enviar email de notificación al equipo
    await emailService.sendContactNotification({
      fullName,
      documentNumber,
      email,
      phone,
      message,
      contactId: newContact._id
    });

    // Enviar email de confirmación al cliente
    await emailService.sendContactConfirmation(email, fullName);

    res.status(201).json({
      success: true,
      message: 'Mensaje enviado exitosamente. Te contactaremos pronto.',
      contactId: newContact._id
    });

  } catch (error) {
    console.error('Error al procesar contacto:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error del servidor. Por favor intenta más tarde.' 
    });
  }
});

// @route   GET /api/contacts
// @desc    Obtener todos los contactos (Admin)
// @access  Private/Admin
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (status) query.status = status;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error obteniendo contactos:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error del servidor' 
    });
  }
});

// @route   GET /api/contacts/:id
// @desc    Obtener un contacto específico (Admin)
// @access  Private/Admin
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ 
        success: false,
        message: 'Contacto no encontrado' 
      });
    }

    res.json({
      success: true,
      contact
    });

  } catch (error) {
    console.error('Error obteniendo contacto:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error del servidor' 
    });
  }
});

// @route   PUT /api/contacts/:id/status
// @desc    Actualizar estado de contacto (Admin)
// @access  Private/Admin
router.put('/:id/status', [
  body('status').isIn(['nuevo', 'leido', 'respondido', 'cerrado']).withMessage('Estado inválido')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { status } = req.body;
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ 
        success: false,
        message: 'Contacto no encontrado' 
      });
    }

    res.json({
      success: true,
      message: 'Estado actualizado exitosamente',
      contact
    });

  } catch (error) {
    console.error('Error actualizando contacto:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error del servidor' 
    });
  }
});

// @route   GET /api/contacts/stats/summary
// @desc    Obtener estadísticas de contactos (Admin)
// @access  Private/Admin
router.get('/stats/summary', async (req, res) => {
  try {
    const total = await Contact.countDocuments();
    const nuevos = await Contact.countDocuments({ status: 'nuevo' });
    const leidos = await Contact.countDocuments({ status: 'leido' });
    const respondidos = await Contact.countDocuments({ status: 'respondido' });
    const cerrados = await Contact.countDocuments({ status: 'cerrado' });

    // Contactos de los últimos 30 días
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentContacts = await Contact.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    res.json({
      success: true,
      stats: {
        total,
        nuevos,
        leidos,
        respondidos,
        cerrados,
        recentContacts
      }
    });

  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error del servidor' 
    });
  }
});

module.exports = router;
