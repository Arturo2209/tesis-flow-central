
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, Video, Plus } from 'lucide-react';
import Layout from '../components/layout/Layout';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const meetings = [
    {
      id: 1,
      title: 'Revisión Marco Teórico - Cap. 1',
      advisor: 'Dr. Rosa Delgado',
      date: '2024-06-20',
      time: '14:00',
      duration: '60 min',
      type: 'virtual',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Asesoría Metodología',
      advisor: 'Dr. Rosa Delgado',
      date: '2024-06-22',
      time: '10:00',
      duration: '45 min',
      type: 'presencial',
      location: 'Oficina 205 - Edificio A',
      status: 'pending'
    }
  ];

  const deadlines = [
    {
      id: 1,
      title: 'Entrega Marco Teórico - Cap. 2',
      date: '2024-06-25',
      phase: 'Marco Teórico',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Revisión de Metodología',
      date: '2024-06-30',
      phase: 'Metodología',
      priority: 'medium'
    }
  ];

  const availabilitySlots = [
    { date: '2024-06-21', time: '09:00', available: true },
    { date: '2024-06-21', time: '11:00', available: true },
    { date: '2024-06-21', time: '15:00', available: false },
    { date: '2024-06-24', time: '10:00', available: true },
    { date: '2024-06-24', time: '14:00', available: true }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Calendario</h1>
          <p className="text-gray-600">Gestiona tus reuniones y fechas importantes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Próximas reuniones */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Próximas Reuniones</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Nueva Reunión</span>
                </button>
              </div>

              <div className="space-y-4">
                {meetings.map((meeting) => (
                  <div key={meeting.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-2">{meeting.title}</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>{meeting.advisor}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{new Date(meeting.date).toLocaleDateString('es-ES')} - {meeting.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{meeting.duration}</span>
                          </div>
                          {meeting.type === 'virtual' && meeting.meetingLink && (
                            <div className="flex items-center space-x-2">
                              <Video className="w-4 h-4" />
                              <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer" 
                                 className="text-blue-600 hover:text-blue-800">
                                Unirse a la reunión
                              </a>
                            </div>
                          )}
                          {meeting.type === 'presencial' && meeting.location && (
                            <div className="flex items-center space-x-2">
                              <span>📍</span>
                              <span>{meeting.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          meeting.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {meeting.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fechas límite importantes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Fechas Límite Próximas</h2>
              
              <div className="space-y-4">
                {deadlines.map((deadline) => (
                  <div key={deadline.id} className={`border rounded-lg p-4 ${getPriorityColor(deadline.priority)}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{deadline.title}</h3>
                        <p className="text-sm opacity-75 mt-1">Fase: {deadline.phase}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {new Date(deadline.date).toLocaleDateString('es-ES')}
                        </div>
                        <div className="text-sm opacity-75">
                          {Math.ceil((new Date(deadline.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} días restantes
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Disponibilidad del asesor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Disponibilidad de Asesor</h3>
              
              <div className="space-y-3">
                {availabilitySlots.map((slot, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    slot.available 
                      ? 'border-green-200 bg-green-50 cursor-pointer hover:bg-green-100' 
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">
                          {new Date(slot.date).toLocaleDateString('es-ES')}
                        </div>
                        <div className="text-sm text-gray-600">{slot.time}</div>
                      </div>
                      {slot.available && (
                        <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                          Agendar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vista rápida del progreso */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progreso Actual</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Fase 2 de 5</span>
                  <span>40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <p className="text-sm text-gray-600">Marco Teórico en progreso</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;
