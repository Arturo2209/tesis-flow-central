
import React from 'react';
import { Mail, Phone, Calendar, MessageCircle } from 'lucide-react';

const AdvisorCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Mi Asesor</h3>
      
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold">DR</span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">Dr. Rosa Delgado</h4>
          <p className="text-sm text-gray-600">Ingeniería de Software</p>
          <div className="flex items-center space-x-1 mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-600">Disponible</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span>rosa.delgado@tecsup.edu.pe</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <span>+51 999 123 456</span>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1">
          <MessageCircle className="w-4 h-4" />
          <span>Chatear</span>
        </button>
        <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>Agendar</span>
        </button>
      </div>
    </div>
  );
};

export default AdvisorCard;
