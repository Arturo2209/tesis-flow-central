
import React from 'react';
import { Upload, Users, Calendar, MessageSquare } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      icon: Upload,
      title: 'Subir Documento',
      description: 'Sube tu avance actual',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      icon: Users,
      title: 'Contactar Asesor',
      description: 'Programa una reunión',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      icon: Calendar,
      title: 'Ver Calendario',
      description: 'Próximas fechas importantes',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    },
    {
      icon: MessageSquare,
      title: 'Comentarios',
      description: 'Revisar observaciones',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`${action.color} ${action.hoverColor} text-white p-4 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md`}
          >
            <action.icon className="w-6 h-6 mb-2" />
            <h4 className="font-medium text-sm">{action.title}</h4>
            <p className="text-xs opacity-90 mt-1">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
