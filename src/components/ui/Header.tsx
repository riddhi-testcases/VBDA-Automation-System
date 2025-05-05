import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, User } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  // Get the page title based on the current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path === '/recipients') return 'Recipients';
    if (path === '/templates') return 'Email Templates';
    if (path.includes('/campaigns')) {
      if (path === '/campaigns/new') return 'Create Campaign';
      return 'Campaigns';
    }
    if (path === '/analytics') return 'Analytics';
    if (path === '/settings') return 'Settings';
    return 'VBDA Email Automation';
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle()}</h1>
      
      <div className="flex items-center space-x-4">
        <div className="relative w-64 hidden md:block">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none">
          <Bell size={20} />
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <User size={18} />
          </div>
          <span className="text-sm font-medium text-gray-700 hidden md:inline">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;