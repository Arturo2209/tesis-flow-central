
import React from 'react';
import { AlertTriangle, CheckCircle, ArrowRight, GraduationCap, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProgressCard from '../components/dashboard/ProgressCard';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import AdvisorCard from '../components/dashboard/AdvisorCard';

const Dashboard = () => {
  const { profile, thesis, getAdvisorById } = useAuth();
  const assignedAdvisor = thesis ? getAdvisorById(thesis.asesorId) : null;

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      <div className="pt-16 p-6">
        {/* Bienvenida */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Bienvenido de vuelta, {profile?.nombres?.split(' ')[0] || 'Estudiante'}! 👋
          </h1>
          <p className="text-gray-600">
            Aquí tienes un resumen de tu progreso y próximas tareas.
          </p>
        </div>

        {/* Alertas de progreso */}
        <div className="space-y-4 mb-6">
          {/* Alerta de perfil incompleto */}
          {!profile && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-red-900">Perfil Incompleto</h3>
                  <p className="text-red-800 text-sm mt-1">
                    Necesitas completar tu información personal para acceder a todas las funcionalidades del sistema.
                  </p>
                  <Link 
                    to="/perfil"
                    className="inline-flex items-center space-x-1 text-red-700 hover:text-red-900 text-sm font-medium mt-3 bg-red-100 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Completar Perfil</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Alerta de tesis no registrada */}
          {profile && !thesis && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-orange-900">Información de Tesis Pendiente</h3>
                  <p className="text-orange-800 text-sm mt-1">
                    Debes registrar la información de tu tesis o pretesis y seleccionar un asesor para continuar con el proceso.
                  </p>
                  <Link 
                    to="/mi-tesis"
                    className="inline-flex items-center space-x-1 text-orange-700 hover:text-orange-900 text-sm font-medium mt-3 bg-orange-100 px-3 py-1 rounded-lg hover:bg-orange-200 transition-colors"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Registrar Tesis</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Confirmación de perfil y tesis completos */}
          {profile && thesis && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-green-900">¡Todo Listo para Continuar!</h3>
                  <p className="text-green-800 text-sm mt-1">
                    Tu perfil está completo y tu tesis "{thesis.nombre}" está registrada con el asesor {assignedAdvisor?.nombre}.
                  </p>
                  <div className="mt-3 flex space-x-3">
                    <Link 
                      to="/documentos"
                      className="inline-flex items-center space-x-1 text-green-700 hover:text-green-900 text-sm font-medium bg-green-100 px-3 py-1 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      <span>Subir Documentos</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link 
                      to="/calendario"
                      className="inline-flex items-center space-x-1 text-green-700 hover:text-green-900 text-sm font-medium bg-green-100 px-3 py-1 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      <span>Programar Reunión</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Grid principal - solo mostrar si el perfil está completo */}
        {profile && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Progreso - Ocupa 2 columnas */}
              <div className="lg:col-span-2">
                <ProgressCard />
              </div>
              
              {/* Acciones rápidas */}
              <div>
                <QuickActions />
              </div>
            </div>

            {/* Segunda fila */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Actividad reciente */}
              <div>
                <RecentActivity />
              </div>
              
              {/* Información del asesor */}
              <div>
                <AdvisorCard />
              </div>
            </div>

            {/* Estadísticas adicionales */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-blue-600">
                  {thesis ? '25%' : '0%'}
                </div>
                <div className="text-sm text-gray-600">Progreso Total</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-green-600">0</div>
                <div className="text-sm text-gray-600">Docs Aprobados</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-orange-600">
                  {thesis ? '1' : '2'}
                </div>
                <div className="text-sm text-gray-600">Pendientes</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-purple-600">--</div>
                <div className="text-sm text-gray-600">Próxima Entrega</div>
              </div>
            </div>
          </>
        )}

        {/* Mensaje de bienvenida para usuarios sin perfil */}
        {!profile && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Completa tu perfil para comenzar
            </h2>
            <p className="text-gray-600 mb-6">
              Para acceder a todas las funcionalidades del sistema, necesitas completar tu información personal.
            </p>
            <Link 
              to="/perfil"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <UserIcon className="w-5 h-5" />
              <span>Completar Perfil</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
