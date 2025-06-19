
import React from 'react';
import Layout from '../components/layout/Layout';
import { CheckCircle, Circle, Clock, FileText, Calendar } from 'lucide-react';

const Progress = () => {
  const phases = [
    {
      id: 1,
      title: 'Propuesta de Tema',
      description: 'Definición del tema y objetivos de la tesis',
      status: 'completed',
      dueDate: '2024-03-15',
      documents: ['Propuesta_Tema.pdf', 'Cronograma_Inicial.pdf']
    },
    {
      id: 2,
      title: 'Marco Teórico',
      description: 'Desarrollo del marco teórico y estado del arte',
      status: 'in-progress',
      dueDate: '2024-07-15',
      documents: ['Marco_Teorico_Cap1.pdf'],
      progress: 60
    },
    {
      id: 3,
      title: 'Metodología',
      description: 'Definición de la metodología de investigación',
      status: 'pending',
      dueDate: '2024-09-30',
      documents: []
    },
    {
      id: 4,
      title: 'Desarrollo',
      description: 'Implementación y desarrollo del proyecto',
      status: 'pending',
      dueDate: '2024-11-15',
      documents: []
    },
    {
      id: 5,
      title: 'Sustentación',
      description: 'Preparación y presentación final',
      status: 'pending',
      dueDate: '2024-12-20',
      documents: []
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-8 h-8 text-blue-500" />;
      default:
        return <Circle className="w-8 h-8 text-gray-300" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50';
      case 'in-progress':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Progreso de Tesis</h1>
          <p className="text-gray-600">
            Seguimiento detallado de cada fase de tu proceso de tesis
          </p>
        </div>

        {/* Línea de tiempo */}
        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
          
          <div className="space-y-8">
            {phases.map((phase, index) => (
              <div key={phase.id} className="relative flex items-start space-x-6">
                {/* Icono de estado */}
                <div className="flex-shrink-0 relative z-10 bg-white border-4 border-gray-300 rounded-full p-2">
                  {getStatusIcon(phase.status)}
                </div>
                
                {/* Contenido de la fase */}
                <div className={`flex-1 border-2 rounded-lg p-6 ${getStatusColor(phase.status)}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Fase {phase.id}: {phase.title}
                      </h3>
                      <p className="text-gray-600 mt-1">{phase.description}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(phase.dueDate).toLocaleDateString('es-ES')}</span>
                    </div>
                  </div>

                  {/* Barra de progreso para fase en curso */}
                  {phase.status === 'in-progress' && phase.progress && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progreso</span>
                        <span>{phase.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${phase.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Documentos */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>Documentos ({phase.documents.length})</span>
                    </h4>
                    {phase.documents.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {phase.documents.map((doc, docIndex) => (
                          <span 
                            key={docIndex}
                            className="inline-block bg-white px-3 py-1 rounded-full text-sm border border-gray-200"
                          >
                            {doc}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No hay documentos subidos</p>
                    )}
                  </div>

                  {/* Acciones */}
                  {phase.status !== 'completed' && (
                    <div className="mt-4 flex space-x-2">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        Subir Documento
                      </button>
                      {phase.status === 'in-progress' && (
                        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                          Ver Comentarios
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Progress;
