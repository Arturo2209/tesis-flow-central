
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  TrendingUp, 
  FileText, 
  Users, 
  Bell,
  BookOpen,
  Calendar,
  User,
  LogOut,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { profile, logout } = useAuth();

  const menuItems = [
    { path: '/', icon: Home, label: 'Inicio' },
    { path: '/progreso', icon: TrendingUp, label: 'Progreso' },
    { path: '/mi-tesis', icon: GraduationCap, label: 'Mi Tesis' },
    { path: '/documentos', icon: FileText, label: 'Documentos' },
    { path: '/asesor', icon: Users, label: 'Mi Asesor' },
    { path: '/calendario', icon: Calendar, label: 'Calendario' },
    { path: '/notificaciones', icon: Bell, label: 'Notificaciones' }
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-10 flex flex-col">
      {/* Logo y título */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Thesia</h1>
            <p className="text-sm text-gray-500">TECSUP Centro</p>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <nav className="p-4 flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Información del estudiante */}
      <div className="border-t border-gray-200">
        {/* Perfil */}
        <NavLink 
          to="/perfil"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-6 py-4 hover:bg-gray-50 transition-colors ${
              isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600'
            }`
          }
        >
          <User className="w-5 h-5" />
          <div className="flex-1">
            <p className="text-sm font-medium">Mi Perfil</p>
            <p className="text-xs text-gray-500">Editar información</p>
          </div>
        </NavLink>

        {/* Info del usuario */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {profile?.nombres ? profile.nombres.split(' ').map(n => n[0]).join('').slice(0, 2) : 'ES'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {profile?.nombres || 'Estudiante'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {profile?.carrera ? 'DDS' : 'Estudiante DDS'}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
