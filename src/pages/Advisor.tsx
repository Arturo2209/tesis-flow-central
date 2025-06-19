
import React, { useState } from 'react';
import { Mail, Phone, Calendar, MessageCircle, User, BookOpen, Clock, Star } from 'lucide-react';
import Layout from '../components/layout/Layout';

const Advisor = () => {
  const [selectedTab, setSelectedTab] = useState('profile');

  const advisor = {
    name: 'Dr. Rosa Delgado',
    email: 'rosa.delgado@tecsup.edu.pe',
    phone: '+51 999 123 456',
    specialization: 'Ingeniería de Software',
    experience: '8 años',
    status: 'Disponible',
    rating: 4.8,
    totalStudents: 12,
    completedThesis: 34,
    bio: 'Doctora en Ingeniería de Software con especialización en desarrollo de aplicaciones web y móviles. Experiencia en metodologías ágiles y arquitecturas de software.',
    expertise: ['Desarrollo Web', 'Arquitectura de Software', 'Metodologías Ágiles', 'Bases de Datos', 'UX/UI Design']
  };

  const communications = [
    {
      id: 1,
      type: 'comment',
      title: 'Comentario en Marco Teórico',
      message: 'Excelente trabajo en la fundamentación teórica. Sugiero ampliar la sección de metodologías ágiles.',
      date: '2024-06-18',
      status: 'new'
    },
    {
      id: 2,
      type: 'meeting',
      title: 'Reunión programada',
      message: 'Reunión para revisar el capítulo 2 del marco teórico. Te esperamos el viernes a las 2:00 PM.',
      date: '2024-06-17',
      status: 'read'
    },
    {
      id: 3,
      type: 'approval',
      title: 'Documento aprobado',
      message: 'La propuesta de tema ha sido aprobada. Puedes continuar con el marco teórico.',
      date: '2024-06-15',
      status: 'read'
    }
  ];

  const schedule = [
    { day: 'Lunes', hours: '9:00 - 12:00, 14:00 - 17:00' },
    { day: 'Martes', hours: '10:00 - 13:00' },
    { day: 'Miércoles', hours: '9:00 - 12:00, 15:00 - 18:00' },
    { day: 'Jueves', hours: '14:00 - 17:00' },
    { day: 'Viernes', hours: '9:00 - 12:00' }
  ];

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'comment': return MessageCircle;
      case 'meeting': return Calendar;
      case 'approval': return Star;
      default: return MessageCircle;
    }
  };

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'communication', label: 'Comunicación', icon: MessageCircle },
    { id: 'schedule', label: 'Horarios', icon: Clock }
  ];

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Asesor</h1>
          <p className="text-gray-600">Información y comunicación con tu asesor de tesis</p>
        </div>

        {/* Tarjeta principal del asesor */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-semibold">RD</span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{advisor.name}</h2>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 font-medium">{advisor.status}</span>
                </div>
              </div>
              
              <p className="text-lg text-gray-600 mb-3">{advisor.specialization}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{advisor.rating}/5.0</span>
                </span>
                <span>{advisor.experience} de experiencia</span>
                <span>{advisor.completedThesis} tesis completadas</span>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>Enviar Mensaje</span>
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Agendar Reunión</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Tab: Perfil */}
            {selectedTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Sobre el Asesor</h3>
                  <p className="text-gray-600 leading-relaxed">{advisor.bio}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Áreas de Especialización</h3>
                  <div className="flex flex-wrap gap-2">
                    {advisor.expertise.map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Información de Contacto</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600">{advisor.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600">{advisor.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Estadísticas</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estudiantes actuales:</span>
                        <span className="font-medium">{advisor.totalStudents}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tesis completadas:</span>
                        <span className="font-medium">{advisor.completedThesis}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Experiencia:</span>
                        <span className="font-medium">{advisor.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Comunicación */}
            {selectedTab === 'communication' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Historial de Comunicación</h3>
                <div className="space-y-4">
                  {communications.map((comm) => {
                    const IconComponent = getMessageIcon(comm.type);
                    return (
                      <div key={comm.id} className={`p-4 rounded-lg border-l-4 ${
                        comm.status === 'new' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
                      }`}>
                        <div className="flex items-start space-x-3">
                          <IconComponent className={`w-5 h-5 mt-1 ${
                            comm.status === 'new' ? 'text-blue-600' : 'text-gray-500'
                          }`} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900">{comm.title}</h4>
                              <span className="text-sm text-gray-500">
                                {new Date(comm.date).toLocaleDateString('es-ES')}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm">{comm.message}</p>
                            {comm.status === 'new' && (
                              <span className="inline-block mt-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                Nuevo
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab: Horarios */}
            {selectedTab === 'schedule' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Horarios de Atención</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {schedule.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{day.day}</span>
                      <span className="text-gray-600">{day.hours}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Nota Importante</h4>
                  <p className="text-blue-800 text-sm">
                    Para agendar una reunión fuera de estos horarios, envía un mensaje explicando tu disponibilidad
                    y el motivo de la reunión.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Advisor;
