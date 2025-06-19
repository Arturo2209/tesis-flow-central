
import React, { useState } from 'react';
import { User, Save, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Profile = () => {
  const { profile, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    codigo: profile?.codigo || '',
    carrera: profile?.carrera || '',
    ciclo: profile?.ciclo || '',
    nombres: profile?.nombres || ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const carreras = [
    'Diseño y Desarrollo de Software',
    'Redes y Comunicaciones',
    'Mecánica y Mantenimiento',
    'Electrónica Industrial',
    'Administración de Negocios'
  ];

  const ciclos = [
    'I Ciclo', 'II Ciclo', 'III Ciclo', 'IV Ciclo', 'V Ciclo', 'VI Ciclo'
  ];

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.codigo.trim()) {
      newErrors.codigo = 'El código es obligatorio';
    } else if (!/^[0-9]{8,10}$/.test(formData.codigo)) {
      newErrors.codigo = 'El código debe tener entre 8 y 10 dígitos';
    }

    if (!formData.nombres.trim()) {
      newErrors.nombres = 'Los nombres son obligatorios';
    } else if (formData.nombres.trim().length < 3) {
      newErrors.nombres = 'Los nombres deben tener al menos 3 caracteres';
    }

    if (!formData.carrera) {
      newErrors.carrera = 'Debe seleccionar una carrera';
    }

    if (!formData.ciclo) {
      newErrors.ciclo = 'Debe seleccionar un ciclo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      updateProfile(formData);
      toast.success('Perfil completado exitosamente', {
        description: 'Serás redirigido al inicio en un momento'
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
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
              <p className="text-gray-600">Completa tu información personal para continuar</p>
            </div>
          </div>
        </div>

        {/* Alerta informativa */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-blue-800">
              <p className="font-medium">Información requerida</p>
              <p className="text-sm mt-1">
                Para acceder al sistema completo, necesitas completar todos los campos obligatorios.
                Esta información será utilizada para personalizar tu experiencia y gestionar tu proceso de tesis.
              </p>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Código de estudiante */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código de Estudiante *
              </label>
              <input
                type="text"
                placeholder="Ej: 202012345"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.codigo ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                value={formData.codigo}
                onChange={(e) => handleInputChange('codigo', e.target.value)}
              />
              {errors.codigo && (
                <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.codigo}</span>
                </p>
              )}
            </div>

            {/* Nombres completos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombres Completos *
              </label>
              <input
                type="text"
                placeholder="Ej: Juan Carlos Silva Mendoza"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.nombres ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                value={formData.nombres}
                onChange={(e) => handleInputChange('nombres', e.target.value)}
              />
              {errors.nombres && (
                <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.nombres}</span>
                </p>
              )}
            </div>

            {/* Carrera */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Carrera *
              </label>
              <select
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.carrera ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                value={formData.carrera}
                onChange={(e) => handleInputChange('carrera', e.target.value)}
              >
                <option value="">Selecciona tu carrera</option>
                {carreras.map(carrera => (
                  <option key={carrera} value={carrera}>{carrera}</option>
                ))}
              </select>
              {errors.carrera && (
                <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.carrera}</span>
                </p>
              )}
            </div>

            {/* Ciclo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ciclo Actual *
              </label>
              <select
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.ciclo ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                value={formData.ciclo}
                onChange={(e) => handleInputChange('ciclo', e.target.value)}
              >
                <option value="">Selecciona tu ciclo</option>
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

            {/* Botón de guardar */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Guardar y Continuar</span>
              </button>
            </div>
          </form>
        </div>

        {/* Footer informativo */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>* Campos obligatorios</p>
          <p className="mt-1">Podrás editar esta información posteriormente desde tu perfil</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
