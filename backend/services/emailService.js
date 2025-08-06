const nodemailer = require('nodemailer');
const crypto = require('crypto');

class EmailService {
  constructor() {
    // Inicializar el transporter solo cuando se necesite
    this.transporter = null;
  }

  // Método para obtener el transporter de forma lazy
  getTransporter() {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
        tls: {
          rejectUnauthorized: false
        }
      });
    }
    return this.transporter;
  }

  // Generar token único
  generateToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  // Email de confirmación de suscripción
  async sendConfirmationEmail(email, token) {
    const confirmUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/confirm-subscription/${token}`;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Confirma tu suscripción - Velour</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #D4A574, #B8956A); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #D4A574; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Bienvenido/a a Velour! 💜</h1>
            <p>Confirma tu suscripción para recibir ofertas exclusivas</p>
          </div>
          <div class="content">
            <p>¡Hola!</p>
            <p>Gracias por suscribirte a Velour. Estamos emocionados de tenerte en nuestra comunidad.</p>
            <p>Para completar tu suscripción y comenzar a recibir nuestras ofertas exclusivas, tips de cuidado capilar y novedades, por favor confirma tu email haciendo clic en el botón de abajo:</p>
            
            <div style="text-align: center;">
              <a href="${confirmUrl}" class="button">CONFIRMAR SUSCRIPCIÓN</a>
            </div>
            
            <p>Una vez confirmada tu suscripción, recibirás:</p>
            <ul>
              <li>🎁 Ofertas exclusivas y descuentos especiales</li>
              <li>💡 Tips y rutinas para el cuidado capilar</li>
              <li>✨ Novedades y lanzamientos de productos</li>
              <li>📰 Newsletter con contenido de valor</li>
            </ul>
            
            <p>Si no puedes hacer clic en el botón, copia y pega este enlace en tu navegador:</p>
            <p style="word-break: break-all; color: #D4A574;">${confirmUrl}</p>
            
            <p>¡Esperamos que disfrutes siendo parte de la familia Velour!</p>
            <p>Con cariño,<br>El equipo de Velour</p>
          </div>
          <div class="footer">
            <p>Si no te suscribiste a este newsletter, puedes ignorar este email.</p>
            <p>© 2025 Velour. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
      ¡Bienvenido/a a Velour!
      
      Gracias por suscribirte. Para completar tu suscripción, visita:
      ${confirmUrl}
      
      Una vez confirmada, recibirás ofertas exclusivas, tips de cuidado capilar y más.
      
      ¡Esperamos que disfrutes siendo parte de la familia Velour!
      
      El equipo de Velour
    `;

    try {
      await this.getTransporter().sendMail({
        from: `"Velour" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '✨ Confirma tu suscripción a Velour',
        text: textContent,
        html: htmlContent
      });
      return true;
    } catch (error) {
      console.error('Error enviando email de confirmación:', error);
      return false;
    }
  }

  // Email de bienvenida después de confirmación
  async sendWelcomeEmail(email) {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>¡Bienvenido/a a Velour!</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #D4A574, #B8956A); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .product-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
          .product { background: white; padding: 15px; border-radius: 8px; text-align: center; }
          .cta-button { display: inline-block; background: #D4A574; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 ¡Suscripción confirmada!</h1>
            <p>Ahora eres parte de la familia Velour</p>
          </div>
          <div class="content">
            <p>¡Hola!</p>
            <p>¡Excelente! Tu suscripción ha sido confirmada exitosamente. Ahora formas parte de nuestra exclusiva comunidad.</p>
            
            <h3>🌟 Descubre nuestros productos estrella:</h3>
            <div class="product-grid">
              <div class="product">
                <h4>💧 Shampoo Revitalizador</h4>
                <p>Fórmula que activa la raíz y reduce la caída capilar</p>
                <strong>$60.000 COP</strong>
              </div>
              <div class="product">
                <h4>✨ Tratamiento Reparador</h4>
                <p>Repara el daño causado por herramientas de calor</p>
                <strong>$69.900 COP</strong>
              </div>
            </div>
            
            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" class="cta-button">EXPLORAR PRODUCTOS</a>
            </div>
            
            <p>Como miembro de nuestra comunidad, serás el primero en conocer:</p>
            <ul>
              <li>🎁 Ofertas y descuentos exclusivos</li>
              <li>💡 Tips personalizados de cuidado capilar</li>
              <li>🆕 Lanzamientos de nuevos productos</li>
              <li>📚 Guías y tutoriales gratuitos</li>
            </ul>
            
            <p>¡Gracias por confiar en Velour para el cuidado de tu cabello!</p>
            <p>Con amor,<br>El equipo de Velour 💜</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await this.getTransporter().sendMail({
        from: `"Velour" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '🎉 ¡Bienvenido/a a Velour! Tu suscripción está activa',
        html: htmlContent
      });
      return true;
    } catch (error) {
      console.error('Error enviando email de bienvenida:', error);
      return false;
    }
  }

  // Email personalizado/campaña
  async sendCampaignEmail(email, subject, htmlContent, textContent) {
    try {
      await this.getTransporter().sendMail({
        from: `"Velour" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: subject,
        text: textContent,
        html: htmlContent
      });
      return true;
    } catch (error) {
      console.error('Error enviando email de campaña:', error);
      return false;
    }
  }
}

module.exports = new EmailService();
