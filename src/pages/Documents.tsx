
import React, { useState } from 'react';
import { Upload, FileText, Download, Calendar, MessageSquare, Filter, Search } from 'lucide-react';
import Layout from '../components/layout/Layout';

const Documents = () => {
  const [selectedPhase, setSelectedPhase] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const phases = [
    { id: 1, name: 'Propuesta de Tema', required: true },
    { id: 2, name: 'Marco Teórico', required: true },
    { id: 3, name: 'Metodología', required: true },
    { id: 4, name: 'Desarrollo', required: true },
    { id: 5, name: 'Sustentación', required: true }
  ];

  const documents = [
    {
      id: 1,
      phase: 1,
      phaseName: 'Propuesta de Tema',
      fileName: 'Propuesta_JuanSilva_v2.pdf',
      uploadDate: '2024-06-15',
      status: 'Aprobado',
      comments: 3,
      version: 2
    },
    {
      id: 2,
      phase: 2,
      phaseName: 'Marco Teórico',
      fileName: 'MarcoTeorico_Cap1_JuanSilva.pdf',
      uploadDate: '2024-06-18',
      status: 'Revisado',
      comments: 2,
      version: 1
    },
    {
      id: 3,
      phase: 2,
      phaseName: 'Marco Teórico',
      fileName: 'MarcoTeorico_Cap2_JuanSilva.pdf',
      uploadDate: '2024-06-19',
      status: 'Pendiente',
      comments: 0,
      version: 1
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprobado': return 'bg-green-100 text-green-800';
      case 'Revisado': return 'bg-blue-100 text-blue-800';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Rechazado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesPhase = selectedPhase === 'all' || doc.phase.toString() === selectedPhase;
    const matchesSearch = doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.phaseName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPhase && matchesSearch;
  });

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Documentos</h1>
          <p className="text-gray-600">Gestiona todas tus entregas y revisa el historial completo</p>
        </div>

        {/* Controles de filtro y búsqueda */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre de archivo o fase..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filtro por fase */}
            <div className="md:w-64">
              <div className="relative">
                <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  value={selectedPhase}
                  onChange={(e) => setSelectedPhase(e.target.value)}
                >
                  <option value="all">Todas las fases</option>
                  {phases.map(phase => (
                    <option key={phase.id} value={phase.id.toString()}>
                      Fase {phase.id} - {phase.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Área de subida de documentos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Subir Nuevo Documento</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Arrastra tu documento aquí</h3>
            <p className="text-gray-600 mb-4">O haz clic para seleccionar un archivo</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Seleccionar Archivo
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Formato PDF • Máximo 20 MB • Nomenclatura: Fase_NombreApellido_v1.pdf
            </p>
          </div>
        </div>

        {/* Lista de documentos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Historial de Entregas</h2>
            <p className="text-gray-600 mt-1">{filteredDocuments.length} documentos encontrados</p>
          </div>

          {filteredDocuments.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No se encontraron documentos</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <h3 className="font-medium text-gray-900">{doc.fileName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          v{doc.version}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <span className="font-medium">Fase {doc.phase}:</span>
                          <span>{doc.phaseName}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(doc.uploadDate).toLocaleDateString('es-ES')}</span>
                        </span>
                        {doc.comments > 0 && (
                          <span className="flex items-center space-x-1 text-blue-600">
                            <MessageSquare className="w-4 h-4" />
                            <span>{doc.comments} comentario{doc.comments > 1 ? 's' : ''}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                      {doc.comments > 0 && (
                        <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                          Ver Comentarios
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Documents;
