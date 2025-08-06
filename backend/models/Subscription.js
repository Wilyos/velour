const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  subscriptionDate: {
    type: Date,
    default: Date.now
  },
  confirmationToken: {
    type: String,
    default: null
  },
  isConfirmed: {
    type: Boolean,
    default: false
  },
  confirmedAt: {
    type: Date,
    default: null
  },
  unsubscribeToken: {
    type: String,
    default: null
  },
  lastEmailSent: {
    type: Date,
    default: null
  },
  emailsSent: {
    type: Number,
    default: 0
  },
  source: {
    type: String,
    default: 'website' // website, admin, import
  }
}, {
  timestamps: true
});

// Índices para búsquedas eficientes
SubscriptionSchema.index({ email: 1 });
SubscriptionSchema.index({ isActive: 1 });
SubscriptionSchema.index({ subscriptionDate: -1 });

module.exports = mongoose.model('Subscription', SubscriptionSchema);
