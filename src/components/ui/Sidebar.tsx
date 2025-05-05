import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Users, FileText, BarChart2, Settings, Home, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-indigo-900 text-white shadow-lg flex flex-col h-screen">
      <div className="p-5 border-b border-indigo-800">
        <div className="flex items-center space-x-3">
          <Mail className="h-8 w-8 text-yellow-400" />
          <div>
            <h1 className="font-bold text-xl">VBDA</h1>
            <p className="text-xs text-indigo-300">Email Automation</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
        <div className="px-4 mb-6">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Main</p>
          <ul className="mt-3 space-y-1">
            <SidebarLink to="/" icon={<Home size={20} />} text="Dashboard" />
            <SidebarLink to="/recipients" icon={<Users size={20} />} text="Recipients" />
            <SidebarLink to="/templates" icon={<FileText size={20} />} text="Templates" />
            <SidebarLink to="/campaigns" icon={<Calendar size={20} />} text="Campaigns" />
            <SidebarLink to="/analytics" icon={<BarChart2 size={20} />} text="Analytics" />
          </ul>
        </div>
        
        <div className="px-4">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">System</p>
          <ul className="mt-3 space-y-1">
            <SidebarLink to="/settings" icon={<Settings size={20} />} text="Settings" />
          </ul>
        </div>
      </nav>
      
      <div className="p-4 border-t border-indigo-800">
        <div className="bg-indigo-800 rounded-lg p-3">
          <p className="text-sm text-indigo-200 mb-1">VBDA 2025</p>
          <p className="text-xs text-indigo-300">25 July 2025</p>
          <p className="text-xs text-indigo-300">Bharat Mandapam, New Delhi</p>
        </div>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, text }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => 
          `flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all ${
            isActive ? 'bg-indigo-800 text-white' : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <span className="mr-3">
              {icon}
            </span>
            <span>{text}</span>
            {isActive && (
              <motion.div
                layoutId="sidebar-indicator"
                className="ml-auto w-1.5 h-5 bg-yellow-400 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </>
        )}
      </NavLink>
    </li>
  );
};

export default Sidebar;