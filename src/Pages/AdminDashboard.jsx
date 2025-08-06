import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Estados para nueva campaña
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    subject: '',
    content: '',
    type: 'newsletter'
  });

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  const loadDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Cargar estadísticas del dashboard
      const dashboardResponse = await fetch('/api/admin/dashboard', { headers });
      if (dashboardResponse.ok) {
        const dashboardData = await dashboardResponse.json();
        setStats(dashboardData.stats);
        setSubscriptions(dashboardData.recentSubscriptions);
        setCampaigns(dashboardData.recentCampaigns);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/campaigns', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCampaign)
      });

      if (response.ok) {
        alert('Campaña creada exitosamente');
        setShowCampaignForm(false);
        setNewCampaign({ subject: '', content: '', type: 'newsletter' });
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
      const response = await fetch(`/api/admin/campaigns/${campaignId}/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
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
              <span className="text-sm text-gray-700">Hola, {user?.name}</span>
              <button
                onClick={logout}
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
              <h3 className="text-lg font-medium text-gray-900">Gestión de Suscripciones</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600">Funcionalidad de gestión de suscripciones en desarrollo...</p>
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
                <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <h4 className="text-lg font-medium mb-4">Crear Nueva Campaña</h4>
                    <form onSubmit={handleCreateCampaign} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Asunto
                        </label>
                        <input
                          type="text"
                          value={newCampaign.subject}
                          onChange={(e) => setNewCampaign({...newCampaign, subject: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo
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
                          Contenido (HTML)
                        </label>
                        <textarea
                          value={newCampaign.content}
                          onChange={(e) => setNewCampaign({...newCampaign, content: e.target.value})}
                          rows={10}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="<h2>Título de la campaña</h2><p>Contenido del email...</p>"
                          required
                        />
                      </div>
                      <div className="flex justify-end space-x-3">
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
