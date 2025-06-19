
import React, { useState } from 'react';
import { Save, AlertCircle, GraduationCap, User, Mail, BookOpen, CheckCircle, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Layout from '../components/layout/Layout';

const MyThesis = () => {
  const { thesis, updateThesis, getAvailableAdvisors, getAdvisorById } = useAuth();
  const navigate = useNavigate();
  
  const [showAdvisorProfiles, setShowAdvisorProfiles] = useState(false);
  const [formData, setFormData] = useState({
    nombre: thesis?.nombre || '',
    ciclo: thesis?.ciclo || '',
    descripcion: thesis?.descripcion || '',
    asesorId: thesis?.asesorId || ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const ciclos = ['V Ciclo', 'IV Ciclo'];
  const availableAdvisors = getAvailableAdvisors();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre de la tesis es obligatorio';
    } else if (formData.nombre.trim().length < 10) {
      newErrors.nombre = 'El nombre debe tener al menos 10 caracteres';
    }

    if (!formData.ciclo) {
      newErrors.ciclo = 'Debe seleccionar un ciclo';
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
      const selectedAdvisor = getAdvisorById(formData.asesorId);
      toast.success('¡Tesis registrada exitosamente!', {
        description: `Asesor asignado: ${selectedAdvisor?.nombre}`
      });
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
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

  if (thesis && !showAdvisorProfiles) {
    const assignedAdvisor = getAdvisorById(thesis.asesorId);
    
    return (
      <Layout>
        <div className="p-6 max-w-4xl mx-auto">
          {/* Información de tesis registrada */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Mi Tesis</h1>
                  <p className="text-green-600 font-medium">Tesis registrada exitosamente</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título de la Tesis</label>
                  <p className="text-gray-900 font-medium">{thesis.nombre}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ciclo</label>
                  <p className="text-gray-900">{thesis.ciclo}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <p className="text-gray-700 text-sm leading-relaxed">{thesis.descripcion}</p>
                </div>
              </div>

              {assignedAdvisor && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Mi Asesor Asignado
                  </h3>
                  <div className="space-y-2">
                    <p className="font-medium text-blue-900">{assignedAdvisor.nombre}</p>
                    <p className="text-blue-700 text-sm">{assignedAdvisor.especialidad}</p>
                    <p className="text-blue-600 text-sm flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {assignedAdvisor.correo}
                    </p>
                    <p className="text-blue-700 text-sm">{assignedAdvisor.descripcion}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => setShowAdvisorProfiles(true)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Editar Información
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mi Tesis</h1>
              <p className="text-gray-600">Registra la información de tu tesis o pretesis</p>
            </div>
          </div>
        </div>

        {/* Alerta informativa */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-blue-800">
              <p className="font-medium">Información de Tesis Requerida</p>
              <p className="text-sm mt-1">
                Para continuar con el proceso, necesitas completar la información de tu tesis y seleccionar un asesor disponible.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulario de tesis */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Información de la Tesis</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre de la tesis */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título de la Tesis/Pretesis *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Sistema de gestión de inventarios para PYMES"
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
                    {ciclos.map(ciclo => (
                      <option key={ciclo} value={ciclo}>{ciclo}</option>
                    ))}
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
                    Descripción del Proyecto *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe brevemente de qué trata tu proyecto, objetivos principales y alcance esperado..."
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
                    <p className="text-gray-400 text-sm">{formData.descripcion.length}/500</p>
                  </div>
                </div>

                {/* Selección de asesor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar Asesor *
                  </label>
                  <select
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.asesorId ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    value={formData.asesorId}
                    onChange={(e) => handleInputChange('asesorId', e.target.value)}
                  >
                    <option value="">Selecciona un asesor disponible</option>
                    {availableAdvisors.map(advisor => (
                      <option key={advisor.id} value={advisor.id}>
                        {advisor.nombre} - {advisor.especialidad} ({advisor.maxTesis - advisor.tesisAsignadas} cupos disponibles)
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
                    Solo se muestran asesores con capacidad disponible
                  </p>
                </div>

                {/* Botón de guardar */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Save className="w-5 h-5" />
                    <span>Registrar Tesis y Asesor</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Panel de asesores disponibles */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Asesores Disponibles</h3>
                <button
                  onClick={() => setShowAdvisorProfiles(!showAdvisorProfiles)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>{showAdvisorProfiles ? 'Ocultar' : 'Ver'} Perfiles</span>
                </button>
              </div>
              
              <div className="text-center py-4">
                <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 text-sm">
                  {availableAdvisors.length} asesores disponibles
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Haz clic en "Ver Perfiles" para conocer más detalles
                </p>
              </div>
            </div>

            {/* Perfiles de asesores */}
            {showAdvisorProfiles && (
              <div className="space-y-4">
                {availableAdvisors.map((advisor) => (
                  <div key={advisor.id} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{advisor.nombre}</h4>
                        <p className="text-blue-600 text-sm font-medium">{advisor.especialidad}</p>
                        <p className="text-gray-600 text-xs mt-1 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {advisor.correo}
                        </p>
                        <p className="text-gray-700 text-xs mt-2 leading-relaxed">
                          {advisor.descripcion}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-green-600 text-xs font-medium">
                            {advisor.maxTesis - advisor.tesisAsignadas} cupos disponibles
                          </span>
                          <button
                            onClick={() => handleInputChange('asesorId', advisor.id)}
                            className={`text-xs px-2 py-1 rounded ${
                              formData.asesorId === advisor.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {formData.asesorId === advisor.id ? 'Seleccionado' : 'Seleccionar'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyThesis;
