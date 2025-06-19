
import React from 'react';
import { AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProgressCard from '../components/dashboard/ProgressCard';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import AdvisorCard from '../components/dashboard/AdvisorCard';

const Dashboard = () => {
  const { profile, thesis } = useAuth();

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

        {/* Alertas de datos faltantes */}
        <div className="space-y-4 mb-6">
          {!thesis && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-orange-900">Información de Tesis Pendiente</h3>
                  <p className="text-orange-800 text-sm mt-1">
                    Debes registrar la información de tu tesis o pretesis para acceder a todas las funcionalidades.
                  </p>
                  <Link 
                    to="/mi-tesis"
                    className="inline-flex items-center space-x-1 text-orange-700 hover:text-orange-900 text-sm font-medium mt-2"
                  >
                    <span>Registrar ahora</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {thesis && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-green-900">Perfil Completo</h3>
                  <p className="text-green-800 text-sm mt-1">
                    Tu información de perfil y tesis está completa. ¡Puedes acceder a todas las funcionalidades!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Grid principal */}
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
            <div className="text-2xl font-bold text-blue-600">40%</div>
            <div className="text-sm text-gray-600">Progreso Total</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-sm text-gray-600">Docs Aprobados</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-orange-600">3</div>
            <div className="text-sm text-gray-600">Pendientes</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">15</div>
            <div className="text-sm text-gray-600">Días Restantes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
