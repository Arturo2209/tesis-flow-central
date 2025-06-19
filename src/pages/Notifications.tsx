
import React, { useState } from 'react';
import { Bell, CheckCircle, Clock, AlertCircle, MessageSquare, Calendar, Filter } from 'lucide-react';
import Layout from '../components/layout/Layout';

const Notifications = () => {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'deadline',
      title: 'Fecha límite próxima',
      message: 'Tu entrega de Marco Teórico - Cap. 2 vence en 3 días (25 de Junio)',
      date: '2024-06-19T10:30:00',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'comment',
      title: 'Nuevo comentario del asesor',
      message: 'Dr. Rosa Delgado ha dejado comentarios en tu documento "Propuesta_JuanSilva_v2.pdf"',
      date: '2024-06-18T15:45:00',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Reunión confirmada',
      message: 'Tu reunión del viernes 20 de junio a las 14:00 ha sido confirmada',
      date: '2024-06-18T09:15:00',
      read: true,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'approval',
      title: 'Documento aprobado',
      message: 'Tu propuesta de tema ha sido aprobada. ¡Felicitaciones! Puedes continuar con la siguiente fase.',
      date: '2024-06-15T11:20:00',
      read: true,
      priority: 'low'
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Recordatorio de reunión',
      message: 'Tienes una reunión programada mañana a las 14:00 con Dr. Rosa Delgado',
      date: '2024-06-19T08:00:00',
      read: false,
      priority: 'medium'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'deadline': return AlertCircle;
      case 'comment': return MessageSquare;
      case 'meeting': return Calendar;
      case 'approval': return CheckCircle;
      case 'reminder': return Clock;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string, read: boolean) => {
    const baseColors = {
      deadline: read ? 'text-red-600 bg-red-100' : 'text-red-700 bg-red-200',
      comment: read ? 'text-blue-600 bg-blue-100' : 'text-blue-700 bg-blue-200',
      meeting: read ? 'text-purple-600 bg-purple-100' : 'text-purple-700 bg-purple-200',
      approval: read ? 'text-green-600 bg-green-100' : 'text-green-700 bg-green-200',
      reminder: read ? 'text-yellow-600 bg-yellow-100' : 'text-yellow-700 bg-yellow-200'
    };
    return baseColors[type as keyof typeof baseColors] || 'text-gray-600 bg-gray-100';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    // TODO: Implementar lógica para marcar como leído
    console.log('Marcar como leído:', id);
  };

  const markAllAsRead = () => {
    // TODO: Implementar lógica para marcar todos como leídos
    console.log('Marcar todos como leídos');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes} minutos`;
    } else if (diffInMinutes < 1440) {
      return `Hace ${Math.floor(diffInMinutes / 60)} horas`;
    } else {
      return date.toLocaleDateString('es-ES');
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Notificaciones</h1>
              <p className="text-gray-600">
                Mantente al día con todas las actualizaciones de tu tesis
                {unreadCount > 0 && (
                  <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                    {unreadCount} sin leer
                  </span>
                )}
              </p>
            </div>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Marcar todas como leídas
              </button>
            )}
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filtrar por:</span>
            
            <div className="flex space-x-2">
              {[
                { id: 'all', label: 'Todas' },
                { id: 'unread', label: 'Sin leer' },
                { id: 'deadline', label: 'Fechas límite' },
                { id: 'comment', label: 'Comentarios' },
                { id: 'meeting', label: 'Reuniones' },
                { id: 'approval', label: 'Aprobaciones' }
              ].map((filterOption) => (
                <button
                  key={filterOption.id}
                  onClick={() => setFilter(filterOption.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filter === filterOption.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filterOption.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lista de notificaciones */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No hay notificaciones para mostrar</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => {
                const IconComponent = getNotificationIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Icono de la notificación */}
                      <div className={`p-2 rounded-full ${getNotificationColor(notification.type, notification.read)}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* Contenido de la notificación */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`}></div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                        
                        <p className={`text-sm ${!notification.read ? 'text-gray-600' : 'text-gray-500'} mb-2`}>
                          {notification.message}
                        </p>
                        
                        <span className="text-xs text-gray-400">{formatDate(notification.date)}</span>
                      </div>

                      {/* Indicador de prioridad y estado */}
                      <div className="flex flex-col items-end space-y-1">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                          notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {notification.priority === 'high' ? 'Alta' :
                           notification.priority === 'medium' ? 'Media' : 'Baja'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Configuración de notificaciones */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Configuración de Notificaciones</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Notificaciones por email</h3>
                <p className="text-sm text-gray-600">Recibir notificaciones importantes en tu correo</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                Configurar
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Recordatorios automáticos</h3>
                <p className="text-sm text-gray-600">Recibir recordatorios antes de fechas límite</p>
              </div>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200">
                Configurar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
