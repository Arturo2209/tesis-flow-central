
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  TrendingUp, 
  Upload, 
  Users, 
  Bell,
  BookOpen,
  FileText,
  Calendar
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { path: '/', icon: Home, label: 'Inicio', active: true },
    { path: '/progreso', icon: TrendingUp, label: 'Progreso' },
    { path: '/entregas', icon: Upload, label: 'Entregas' },
    { path: '/documentos', icon: FileText, label: 'Documentos' },
    { path: '/asesor', icon: Users, label: 'Mi Asesor' },
    { path: '/calendario', icon: Calendar, label: 'Calendario' },
    { path: '/notificaciones', icon: Bell, label: 'Notificaciones' }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-10">
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
      <nav className="p-4">
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
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">JS</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Juan Silva</p>
            <p className="text-xs text-gray-500">Estudiante DDS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
