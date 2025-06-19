
import React from 'react';
import ProgressCard from '../components/dashboard/ProgressCard';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import AdvisorCard from '../components/dashboard/AdvisorCard';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      <div className="pt-16 p-6">
        {/* Bienvenida */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Bienvenido de vuelta, Juan! 👋
          </h1>
          <p className="text-gray-600">
            Aquí tienes un resumen de tu progreso y próximas tareas.
          </p>
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
