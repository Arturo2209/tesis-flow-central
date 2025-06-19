
import React from 'react';
import { Bell, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 ml-64">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Barra de búsqueda */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar documentos..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
          />
        </div>
        
        {/* Notificaciones */}
        <div className="relative">
          <button className="p-2 text-gray-400 hover:text-gray-600 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
