
import React, { useState } from 'react';
import { BookOpen, Edit, Save, AlertCircle, CheckCircle, Eye } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const MyThesis = () => {
  const { thesis, updateThesis } = useAuth();
  const [isEditing, setIsEditing] = useState(!thesis);
  const [showAdvisorList, setShowAdvisorList] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: thesis?.nombre || '',
    ciclo: thesis?.ciclo || '',
    descripcion: thesis?.descripcion || '',
    asesorId: thesis?.asesorId || ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Datos simulados de asesores disponibles
  const asesores = [
    {
      id: '1',
      nombre: 'Dr. Carlos Mendoza Ríos',
      especialidad: 'Desarrollo de Software y Bases de Datos',
      correo: 'carlos.mendoza@tecsup.edu.pe',
      descripcion: 'Especialista en aplicaciones web, móviles y gestión de bases de datos. 15 años de experiencia en la industria.',
      tesisAsignadas: 4,
      maxTesis: 7
    },
    {
      id: '2',
      nombre: 'Mg. Ana Patricia Vega',
      especialidad: 'Inteligencia Artificial y Machine Learning',
      correo: 'ana.vega@tecsup.edu.pe',
      descripcion: 'Experta en IA, análisis de datos y algoritmos de aprendizaje automático. Doctora en Ciencias de la Computación.',
      tesisAsignadas: 3,
      maxTesis: 7
    },
    {
      id: '3',
      nombre: 'Ing. Roberto Silva Pérez',
      especialidad: 'Seguridad Informática y Redes',
      correo: 'roberto.silva@tecsup.edu.pe',
      descripcion: 'Especialista en ciberseguridad, redes de computadoras y sistemas distribuidos. Certificaciones internacionales.',
      tesisAsignadas: 6,
      maxTesis: 7
    },
    {
      id: '4',
      nombre: 'Dr. Luis Fernando Castro',
      especialidad: 'Sistemas de Información Empresariales',
      correo: 'luis.castro@tecsup.edu.pe',
      descripcion: 'Experto en ERP, CRM y sistemas de gestión empresarial. 20 años en consultoría tecnológica.',
      tesisAsignadas: 2,
      maxTesis: 7
    },
    {
      id: '5',
      nombre: 'Mg. Patricia Morales Díaz',
      especialidad: 'UX/UI y Desarrollo Frontend',
      correo: 'patricia.morales@tecsup.edu.pe',
      descripcion: 'Diseñadora UX/UI senior, especialista en experiencia de usuario y interfaces modernas. Magíster en Diseño Digital.',
      tesisAsignadas: 7,
      maxTesis: 7
    }
  ];

  // Filtrar solo asesores disponibles (menos de 7 tesis)
  const asesoresDisponibles = asesores.filter(asesor => asesor.tesisAsignadas < asesor.maxTesis);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre de la tesis es obligatorio';
    } else if (formData.nombre.trim().length < 10) {
      newErrors.nombre = 'El nombre debe tener al menos 10 caracteres';
    }

    if (!formData.ciclo) {
      newErrors.ciclo = 'Debe seleccionar el ciclo';
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es obligatoria';
    } else if (formData.descripcion.trim().length < 50) {
      newErrors.descripcion = 'La descripción debe tener al menos 50 caracteres';
    }

    if (!formData.asesorId) {
      newErrors.asesorId = 'Debe seleccionar un asesor';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      updateThesis(formData);
      setIsEditing(false);
      
      const asesorSeleccionado = asesores.find(a => a.id === formData.asesorId);
      toast.success('Información de tesis guardada exitosamente', {
        description: `Asesor asignado: ${asesorSeleccionado?.nombre}`
      });
    } else {
      toast.error('Por favor, completa todos los campos obligatorios');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const selectedAdvisor = asesores.find(a => a.id === formData.asesorId);

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Tesis</h1>
          <p className="text-gray-600">
            {!thesis ? 'Registra la información de tu tesis o pretesis' : 'Gestiona la información de tu proyecto de tesis'}
          </p>
        </div>

        {!thesis && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div className="text-orange-800">
                <p className="font-medium">Registro Pendiente</p>
                <p className="text-sm mt-1">
                  Debes registrar la información de tu tesis o pretesis para acceder a todas las funcionalidades del sistema.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Información actual de la tesis */}
        {thesis && !isEditing && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Información Registrada</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Editar</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Título de la Tesis</h3>
                <p className="text-gray-700">{thesis.nombre}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Ciclo</h3>
                <p className="text-gray-700">{thesis.ciclo}</p>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="font-medium text-gray-900 mb-2">Descripción</h3>
                <p className="text-gray-700">{thesis.descripcion}</p>
              </div>

              {selectedAdvisor && (
                <div className="md:col-span-2">
                  <h3 className="font-medium text-gray-900 mb-2">Asesor Asignado</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-green-900">{selectedAdvisor.nombre}</h4>
                        <p className="text-green-700 text-sm">{selectedAdvisor.especialidad}</p>
                        <p className="text-green-600 text-sm">{selectedAdvisor.correo}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Formulario de registro/edición */}
        {isEditing && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                {thesis ? 'Editar Información' : 'Registrar Tesis/Pretesis'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre de la tesis */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título de la Tesis/Pretesis *
                </label>
                <input
                  type="text"
                  placeholder="Ej: Sistema de gestión de inventarios para pequeñas empresas"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.nombre ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  value={formData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                />
                {errors.nombre && (
                  <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.nombre}</span>
                  </p>
                )}
              </div>

              {/* Ciclo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ciclo de Carrera *
                </label>
                <select
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.ciclo ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  value={formData.ciclo}
                  onChange={(e) => handleInputChange('ciclo', e.target.value)}
                >
                  <option value="">Selecciona el ciclo</option>
                  <option value="IV ciclo">IV ciclo</option>
                  <option value="V ciclo">V ciclo</option>
                </select>
                {errors.ciclo && (
                  <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.ciclo}</span>
                  </p>
                )}
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción Breve *
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe brevemente el objetivo, alcance y tecnologías que planeas utilizar en tu proyecto..."
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                    errors.descripcion ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  value={formData.descripcion}
                  onChange={(e) => handleInputChange('descripcion', e.target.value)}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.descripcion ? (
                    <p className="text-red-600 text-sm flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.descripcion}</span>
                    </p>
                  ) : (
                    <p className="text-gray-500 text-sm">Mínimo 50 caracteres</p>
                  )}
                  <span className="text-gray-500 text-sm">{formData.descripcion.length}/500</span>
                </div>
              </div>

              {/* Selección de asesor */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Seleccionar Asesor *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowAdvisorList(!showAdvisorList)}
                    className="text-blue-600 text-sm hover:text-blue-800 flex items-center space-x-1"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Ver perfiles de asesores</span>
                  </button>
                </div>
                
                <select
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.asesorId ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  value={formData.asesorId}
                  onChange={(e) => handleInputChange('asesorId', e.target.value)}
                >
                  <option value="">Selecciona un asesor disponible</option>
                  {asesoresDisponibles.map(asesor => (
                    <option key={asesor.id} value={asesor.id}>
                      {asesor.nombre} - {asesor.especialidad} ({asesor.tesisAsignadas}/{asesor.maxTesis} tesis)
                    </option>
                  ))}
                </select>
                {errors.asesorId && (
                  <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.asesorId}</span>
                  </p>
                )}
                
                <p className="text-gray-500 text-sm mt-1">
                  Solo se muestran asesores con disponibilidad (menos de 7 tesis asignadas)
                </p>
              </div>

              {/* Botones */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Guardar Información</span>
                </button>
                
                {thesis && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Lista de perfiles de asesores */}
        {showAdvisorList && (
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Perfiles de Asesores Disponibles</h3>
            
            <div className="space-y-4">
              {asesoresDisponibles.map(asesor => (
                <div key={asesor.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{asesor.nombre}</h4>
                      <p className="text-blue-600 text-sm font-medium">{asesor.especialidad}</p>
                      <p className="text-gray-600 text-sm mt-1">{asesor.correo}</p>
                      <p className="text-gray-700 text-sm mt-2">{asesor.descripcion}</p>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        Disponible
                      </div>
                      <p className="text-gray-500 text-xs mt-1">
                        {asesor.tesisAsignadas}/{asesor.maxTesis} tesis
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {asesores.filter(a => a.tesisAsignadas >= a.maxTesis).length > 0 && (
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-700 mb-3">Asesores No Disponibles</h4>
                <div className="space-y-2">
                  {asesores.filter(a => a.tesisAsignadas >= a.maxTesis).map(asesor => (
                    <div key={asesor.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-700">{asesor.nombre}</h5>
                          <p className="text-gray-600 text-sm">{asesor.especialidad}</p>
                        </div>
                        <div className="text-right">
                          <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                            No Disponible
                          </div>
                          <p className="text-gray-500 text-xs mt-1">
                            {asesor.tesisAsignadas}/{asesor.maxTesis} tesis
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyThesis;
