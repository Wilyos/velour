import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';

const AdminDashboard = () => {
  const { user, isAuthenticated, logout, updateActivity } = useAuth();
  const [stats, setStats] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');
  const [deletingSubscriptions, setDeletingSubscriptions] = useState(false);
  const [sessionTimer, setSessionTimer] = useState('');

  // Estados para nueva campaña
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    subject: '',
    content: '',
    type: 'newsletter',
    // Nuevos campos para generar HTML automáticamente
    title: '',
    mainMessage: '',
    callToAction: '',
    ctaUrl: '',
    additionalInfo: '',
    footer: ''
  });

  // Actualizar timer de sesión
  useEffect(() => {
    const updateSessionTimer = () => {
      const lastActivity = localStorage.getItem('lastActivity');
      if (lastActivity) {
        const timeSinceActivity = Date.now() - parseInt(lastActivity);
        const remainingTime = (10 * 60 * 1000) - timeSinceActivity; // 10 minutos - tiempo transcurrido
        
        if (remainingTime > 0) {
          const minutes = Math.floor(remainingTime / 60000);
          const seconds = Math.floor((remainingTime % 60000) / 1000);
          setSessionTimer(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        } else {
          setSessionTimer('0:00');
        }
      }
    };

    const interval = setInterval(updateSessionTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Detectar actividad del usuario en el dashboard
  useEffect(() => {
    const handleActivity = () => {
      updateActivity();
    };

    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    activityEvents.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [updateActivity]);

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (activeTab === 'subscriptions' && isAuthenticated) {
      loadAllSubscriptions();
    }
  }, [activeTab, subscriptionFilter, isAuthenticated]);

  const loadDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      // Cargar estadísticas del dashboard
      const dashboardResponse = await apiRequest('/api/admin/dashboard', { headers });
      if (dashboardResponse.ok) {
        const dashboardData = await dashboardResponse.json();
        setStats(dashboardData.stats);
        setSubscriptions(dashboardData.recentSubscriptions);
        setCampaigns(dashboardData.recentCampaigns);
      }

      // Si estamos en la pestaña de suscripciones, cargar todas las suscripciones
      if (activeTab === 'subscriptions') {
        await loadAllSubscriptions();
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAllSubscriptions = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      const params = new URLSearchParams();
      if (subscriptionFilter !== 'all') {
        params.append('status', subscriptionFilter);
      }

      const response = await apiRequest(`/api/admin/subscriptions?${params}`, { headers });
      if (response.ok) {
        const data = await response.json();
        setSubscriptions(data.subscriptions);
      }
    } catch (error) {
      console.error('Error loading subscriptions:', error);
    }
  };

  const deletePendingSubscriptions = async () => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar TODAS las suscripciones pendientes? Esta acción no se puede deshacer.')) {
      return;
    }

    setDeletingSubscriptions(true);
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      const response = await apiRequest('/api/admin/subscriptions/pending', { 
        method: 'DELETE',
        headers 
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        // Recargar los datos
        await loadDashboardData();
        if (activeTab === 'subscriptions') {
          await loadAllSubscriptions();
        }
      } else {
        const errorData = await response.json();
        alert('Error: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error deleting pending subscriptions:', error);
      alert('Error al eliminar suscripciones pendientes');
    } finally {
      setDeletingSubscriptions(false);
    }
  };

  const deleteSubscription = async (subscriptionId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta suscripción?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      const response = await apiRequest(`/api/admin/subscriptions/${subscriptionId}`, { 
        method: 'DELETE',
        headers 
      });

      if (response.ok) {
        // Remover de la lista local
        setSubscriptions(prev => prev.filter(sub => sub._id !== subscriptionId));
        alert('Suscripción eliminada exitosamente');
      } else {
        const errorData = await response.json();
        alert('Error: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error deleting subscription:', error);
      alert('Error al eliminar suscripción');
    }
  };

  const resendConfirmationEmail = async (subscriptionId) => {
    if (!window.confirm('¿Reenviar email de confirmación con nuevo token?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      const response = await apiRequest(`/api/admin/subscriptions/${subscriptionId}/resend`, { 
        method: 'PUT',
        headers 
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        // Recargar los datos
        await loadAllSubscriptions();
      } else {
        const errorData = await response.json();
        alert('Error: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error resending confirmation:', error);
      alert('Error al reenviar confirmación');
    }
  };

  const confirmSubscriptionManually = async (subscriptionId) => {
    if (!window.confirm('¿Confirmar esta suscripción manualmente?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      const response = await apiRequest(`/api/admin/subscriptions/${subscriptionId}/confirm`, { 
        method: 'PUT',
        headers 
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        // Recargar los datos
        await loadAllSubscriptions();
      } else {
        const errorData = await response.json();
        alert('Error: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error confirming subscription:', error);
      alert('Error al confirmar suscripción');
    }
  };

  // Función para generar HTML automáticamente
  const generateCampaignHTML = (campaignData) => {
    const { title, mainMessage, callToAction, ctaUrl, additionalInfo, footer } = campaignData;
    
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${campaignData.subject}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #D4A574, #B8956A); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .title { font-size: 28px; font-weight: bold; margin-bottom: 20px; text-align: center; color: #8B5A3C; }
    .message { font-size: 16px; line-height: 1.8; margin-bottom: 25px; }
    .cta-container { text-align: center; margin: 30px 0; }
    .cta-button { 
      display: inline-block; 
      background: #8B5A3C; 
      color: white; 
      padding: 15px 30px; 
      text-decoration: none; 
      border-radius: 8px; 
      font-weight: bold;
      font-size: 16px;
      transition: background 0.3s;
    }
    .cta-button:hover { background: #6D4330; }
    .additional-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #D4A574; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px; }
    .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">VELOUR</div>
      <p>Cuidado capilar premium</p>
    </div>
    <div class="content">
      ${title ? `<h1 class="title">${title}</h1>` : ''}
      
      ${mainMessage ? `<div class="message">${mainMessage.replace(/\n/g, '<br>')}</div>` : ''}
      
      ${callToAction && ctaUrl ? `
      <div class="cta-container">
        <a href="${ctaUrl}" class="cta-button">${callToAction}</a>
      </div>
      ` : ''}
      
      ${additionalInfo ? `
      <div class="additional-info">
        ${additionalInfo.replace(/\n/g, '<br>')}
      </div>
      ` : ''}
    </div>
    <div class="footer">
      ${footer ? footer.replace(/\n/g, '<br>') : ''}
      <p>© 2025 Velour. Todos los derechos reservados.</p>
      <p>¿No deseas recibir más emails? <a href="[UNSUBSCRIBE_URL]" style="color: #8B5A3C;">Cancelar suscripción</a></p>
    </div>
  </div>
</body>
</html>
    `.trim();
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      // Generar el HTML automáticamente
      const generatedHTML = generateCampaignHTML(newCampaign);
      
      const campaignToSend = {
        ...newCampaign,
        content: generatedHTML
      };
      
      const response = await apiRequest('/api/admin/campaigns', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(campaignToSend)
      });

      if (response.ok) {
        alert('Campaña creada exitosamente');
        setShowCampaignForm(false);
        setNewCampaign({ 
          subject: '', 
          content: '', 
          type: 'newsletter',
          title: '',
          mainMessage: '',
          callToAction: '',
          ctaUrl: '',
          additionalInfo: '',
          footer: ''
        });
        loadDashboardData();
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Error al crear la campaña');
    }
  };

  const handleSendCampaign = async (campaignId) => {
    if (!confirm('¿Estás seguro de enviar esta campaña?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await apiRequest(`/api/admin/campaigns/${campaignId}/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        alert('Campaña enviada exitosamente');
        loadDashboardData();
      }
    } catch (error) {
      console.error('Error sending campaign:', error);
      alert('Error al enviar la campaña');
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 yanone-kaffeesatz">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-light text-primary">VELOUR</h1>
              <span className="ml-3 text-gray-500">Panel de Administración</span>
            </div>
            <div className="flex items-center space-x-4">
              {/* Indicador de tiempo de sesión */}
              <div className="flex items-center space-x-2 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-600">Sesión:</span>
                  <span className="font-mono text-gray-800">{sessionTimer}</span>
                </div>
              </div>
              <span className="text-sm text-gray-700">Hola, {user?.name}</span>
              <button
                onClick={() => logout('manual')}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'subscriptions', label: 'Suscripciones' },
              { id: 'campaigns', label: 'Campañas' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && stats && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500">Total Suscripciones</div>
                <div className="text-3xl font-bold text-gray-900">{stats.totalSubscriptions}</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500">Suscripciones Confirmadas</div>
                <div className="text-3xl font-bold text-green-600">{stats.confirmedSubscriptions}</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500">Total Campañas</div>
                <div className="text-3xl font-bold text-blue-600">{stats.totalCampaigns}</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500">Tasa de Conversión</div>
                <div className="text-3xl font-bold text-purple-600">{stats.conversionRate}%</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Subscriptions */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Suscripciones Recientes</h3>
                <div className="space-y-3">
                  {subscriptions.slice(0, 5).map((subscription) => (
                    <div key={subscription._id} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <div className="font-medium text-sm">{subscription.email}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(subscription.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        subscription.isConfirmed 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {subscription.isConfirmed ? 'Confirmado' : 'Pendiente'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Campaigns */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Campañas Recientes</h3>
                <div className="space-y-3">
                  {campaigns.slice(0, 5).map((campaign) => (
                    <div key={campaign._id} className="py-2 border-b border-gray-100">
                      <div className="font-medium text-sm">{campaign.subject}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(campaign.createdAt).toLocaleDateString()} - 
                        <span className={`ml-1 ${
                          campaign.status === 'sent' ? 'text-green-600' : 
                          campaign.status === 'draft' ? 'text-gray-600' : 'text-blue-600'
                        }`}>
                          {campaign.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Subscriptions Tab */}
        {activeTab === 'subscriptions' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Gestión de Suscripciones</h3>
                <div className="flex gap-3">
                  <select
                    value={subscriptionFilter}
                    onChange={(e) => setSubscriptionFilter(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="all">Todas</option>
                    <option value="confirmed">Confirmadas</option>
                    <option value="pending">Pendientes</option>
                    <option value="unsubscribed">Canceladas</option>
                  </select>
                  <button
                    onClick={deletePendingSubscriptions}
                    disabled={deletingSubscriptions}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingSubscriptions ? 'Eliminando...' : 'Eliminar Pendientes'}
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {subscriptions.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">
                    No hay suscripciones {subscriptionFilter !== 'all' ? `${subscriptionFilter}` : ''} para mostrar.
                  </p>
                ) : (
                  subscriptions.map((subscription) => (
                    <div key={subscription._id} className="flex justify-between items-center py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{subscription.email}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Creado: {new Date(subscription.createdAt).toLocaleDateString()} a las {new Date(subscription.createdAt).toLocaleTimeString()}
                          {subscription.confirmedAt && (
                            <span className="ml-4">
                              Confirmado: {new Date(subscription.confirmedAt).toLocaleDateString()} a las {new Date(subscription.confirmedAt).toLocaleTimeString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          subscription.isConfirmed && subscription.isActive
                            ? 'bg-green-100 text-green-800' 
                            : subscription.isConfirmed && !subscription.isActive
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {subscription.isConfirmed && subscription.isActive
                            ? 'Confirmado' 
                            : subscription.isConfirmed && !subscription.isActive
                            ? 'Cancelado'
                            : 'Pendiente'}
                        </span>
                        
                        {/* Botones de acción */}
                        <div className="flex gap-1">
                          {!subscription.isConfirmed && (
                            <>
                              <button
                                onClick={() => resendConfirmationEmail(subscription._id)}
                                className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 rounded hover:bg-blue-50"
                                title="Reenviar email de confirmación"
                              >
                                📧 Reenviar
                              </button>
                              <button
                                onClick={() => confirmSubscriptionManually(subscription._id)}
                                className="text-green-600 hover:text-green-800 text-xs font-medium px-2 py-1 rounded hover:bg-green-50"
                                title="Confirmar manualmente"
                              >
                                ✅ Confirmar
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => deleteSubscription(subscription._id)}
                            className="text-red-600 hover:text-red-800 text-xs font-medium px-2 py-1 rounded hover:bg-red-50"
                            title="Eliminar suscripción"
                          >
                            🗑️ Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Gestión de Campañas</h3>
              <button
                onClick={() => setShowCampaignForm(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Nueva Campaña
              </button>
            </div>

            {/* Campaign Form Modal */}
            {showCampaignForm && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <h4 className="text-lg font-medium mb-4">Crear Nueva Campaña</h4>
                    <form onSubmit={handleCreateCampaign} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Columna izquierda - Información básica */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Asunto del Email *
                            </label>
                            <input
                              type="text"
                              value={newCampaign.subject}
                              onChange={(e) => setNewCampaign({...newCampaign, subject: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                              placeholder="Ej: ¡Nueva colección de productos Velour!"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Tipo de Campaña
                            </label>
                            <select
                              value={newCampaign.type}
                              onChange={(e) => setNewCampaign({...newCampaign, type: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                              <option value="newsletter">Newsletter</option>
                              <option value="promotion">Promoción</option>
                              <option value="announcement">Anuncio</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Título Principal *
                            </label>
                            <input
                              type="text"
                              value={newCampaign.title}
                              onChange={(e) => setNewCampaign({...newCampaign, title: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                              placeholder="Ej: ¡Descubre nuestra nueva línea!"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Botón de Acción
                            </label>
                            <input
                              type="text"
                              value={newCampaign.callToAction}
                              onChange={(e) => setNewCampaign({...newCampaign, callToAction: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                              placeholder="Ej: Ver Productos, Comprar Ahora, Leer Más..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Enlace del Botón
                            </label>
                            <input
                              type="url"
                              value={newCampaign.ctaUrl}
                              onChange={(e) => setNewCampaign({...newCampaign, ctaUrl: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                              placeholder="https://velourvitalize.com/productos"
                            />
                          </div>
                        </div>

                        {/* Columna derecha - Contenido */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Mensaje Principal *
                            </label>
                            <textarea
                              value={newCampaign.mainMessage}
                              onChange={(e) => setNewCampaign({...newCampaign, mainMessage: e.target.value})}
                              rows={6}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                              placeholder="Escribe el mensaje principal que quieres enviar a tus suscriptores..."
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Información Adicional
                            </label>
                            <textarea
                              value={newCampaign.additionalInfo}
                              onChange={(e) => setNewCampaign({...newCampaign, additionalInfo: e.target.value})}
                              rows={4}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                              placeholder="Información extra, detalles, beneficios, etc..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Mensaje de Cierre
                            </label>
                            <textarea
                              value={newCampaign.footer}
                              onChange={(e) => setNewCampaign({...newCampaign, footer: e.target.value})}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                              placeholder="¡Gracias por ser parte de la familia Velour!"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Vista previa */}
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Vista Previa:</h5>
                        <div className="text-xs text-gray-600 max-h-32 overflow-y-auto bg-white p-3 rounded border">
                          <strong>Asunto:</strong> {newCampaign.subject || 'Sin asunto'}<br/>
                          <strong>Título:</strong> {newCampaign.title || 'Sin título'}<br/>
                          <strong>Mensaje:</strong> {newCampaign.mainMessage ? newCampaign.mainMessage.substring(0, 100) + '...' : 'Sin mensaje'}<br/>
                          {newCampaign.callToAction && <span><strong>Botón:</strong> {newCampaign.callToAction}</span>}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3 pt-4 border-t">
                        <button
                          type="button"
                          onClick={() => setShowCampaignForm(false)}
                          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                        >
                          Crear Campaña
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Campaigns List */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{campaign.subject}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Tipo: {campaign.type} | Estado: {campaign.status}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            Creado: {new Date(campaign.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          {campaign.status === 'draft' && (
                            <button
                              onClick={() => handleSendCampaign(campaign._id)}
                              className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                            >
                              Enviar
                            </button>
                          )}
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            campaign.status === 'sent' ? 'bg-green-100 text-green-800' :
                            campaign.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {campaign.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
