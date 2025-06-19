
import React from 'react';
import { CheckCircle, Clock, AlertCircle, MessageSquare } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      type: 'success',
      icon: CheckCircle,
      title: 'Documento aprobado',
      description: 'Marco Teórico - Capítulo 1',
      time: 'Hace 2 horas',
      color: 'text-green-600 bg-green-100'
    },
    {
      type: 'comment',
      icon: MessageSquare,
      title: 'Nuevo comentario',
      description: 'Tu asesor dejó observaciones',
      time: 'Hace 1 día',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      type: 'pending',
      icon: Clock,
      title: 'Entrega pendiente',
      description: 'Marco Teórico - Capítulo 2',
      time: 'Vence en 3 días',
      color: 'text-orange-600 bg-orange-100'
    },
    {
      type: 'alert',
      icon: AlertCircle,
      title: 'Reunión programada',
      description: 'Asesoría virtual - Viernes 2:00 PM',
      time: 'En 2 días',
      color: 'text-red-600 bg-red-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className={`p-2 rounded-full ${activity.color}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              <span className="text-xs text-gray-400 mt-1">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
        Ver toda la actividad
      </button>
    </div>
  );
};

export default RecentActivity;
