
import React from 'react';
import { TrendingUp, Calendar, FileText } from 'lucide-react';

const ProgressCard = () => {
  const currentPhase = 2;
  const totalPhases = 5;
  const progressPercentage = (currentPhase / totalPhases) * 100;

  const phases = [
    'Propuesta de Tema',
    'Marco Teórico',
    'Metodología',
    'Desarrollo',
    'Sustentación'
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Progreso de Tesis</h3>
        <TrendingUp className="w-5 h-5 text-blue-600" />
      </div>
      
      {/* Barra de progreso */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Fase {currentPhase} de {totalPhases}</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Fase actual */}
      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <span className="text-sm font-medium text-blue-800">Fase Actual</span>
        </div>
        <h4 className="font-semibold text-blue-900">{phases[currentPhase - 1]}</h4>
        <p className="text-sm text-blue-700 mt-1">
          Desarrolla el marco teórico de tu investigación
        </p>
      </div>

      {/* Próximos pasos */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">Entrega: 15 de Julio</span>
        </div>
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">Documento pendiente</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
