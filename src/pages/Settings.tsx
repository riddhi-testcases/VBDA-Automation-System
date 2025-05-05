import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Settings as SettingsIcon, User, Bell, Lock, Mail, Users, Save } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          <SettingsTab 
            icon={<User size={18} />}
            label="Account Settings"
            active={activeTab === 'account'}
            onClick={() => setActiveTab('account')}
          />
          <SettingsTab 
            icon={<Mail size={18} />}
            label="Email Settings"
            active={activeTab === 'email'}
            onClick={() => setActiveTab('email')}
          />
          <SettingsTab 
            icon={<Bell size={18} />}
            label="Notifications"
            active={activeTab === 'notifications'}
            onClick={() => setActiveTab('notifications')}
          />
          <SettingsTab 
            icon={<Lock size={18} />}
            label="Security"
            active={activeTab === 'security'}
            onClick={() => setActiveTab('security')}
          />
          <SettingsTab 
            icon={<SettingsIcon size={18} />}
            label="AI Configuration"
            active={activeTab === 'ai'}
            onClick={() => setActiveTab('ai')}
          />
          <SettingsTab 
            icon={<Users size={18} />}
            label="Team Members"
            active={activeTab === 'team'}
            onClick={() => setActiveTab('team')}
          />
        </div>
        
        {/* Content Area */}
        <div className="flex-1">
          {activeTab === 'account' && <AccountSettings />}
          {activeTab === 'email' && <EmailSettings />}
          {activeTab === 'ai' && <AISettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'team' && <TeamSettings />}
        </div>
      </div>
    </div>
  );
};

interface SettingsTabProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ icon, label, active, onClick }) => {
  return (
    <button
      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
        active 
          ? 'bg-indigo-50 text-indigo-700 font-medium' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <span className={`${active ? 'text-indigo-600' : 'text-gray-500'}`}>{icon}</span>
      <span>{label}</span>
    </button>
  );
};

const AccountSettings: React.FC = () => {
  return (
    <Card title="Account Settings">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-semibold">
            BP
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Bharat Economic Forum</h3>
            <p className="text-sm text-gray-500">Administrator</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
            >
              Change Photo
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue="Manish"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue="Patel"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue="contact@bharateconomicforum.org"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue="+91 8744089014"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            defaultValue="Founder & Chairman"
          />
        </div>
        
        <div className="flex justify-end">
          <Button icon={<Save size={16} />}>
            Save Changes
          </Button>
        </div>
      </div>
    </Card>
  );
};

const EmailSettings: React.FC = () => {
  return (
    <Card title="Email Settings">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Email Service Configuration</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">SendGrid</p>
                <p className="text-sm text-gray-500">Connected: BEF@bharateconomicforum.org</p>
              </div>
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Sender Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fromName" className="block text-sm font-medium text-gray-700 mb-1">
                From Name
              </label>
              <input
                type="text"
                id="fromName"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue="Manish Patel, BEF"
              />
            </div>
            <div>
              <label htmlFor="fromEmail" className="block text-sm font-medium text-gray-700 mb-1">
                From Email
              </label>
              <input
                type="email"
                id="fromEmail"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue="contact@bharateconomicforum.org"
              />
            </div>
            <div>
              <label htmlFor="replyTo" className="block text-sm font-medium text-gray-700 mb-1">
                Reply-To Email
              </label>
              <input
                type="email"
                id="replyTo"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue="contact@bharateconomicforum.org"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Email Delivery Settings</h3>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="throttling"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              defaultChecked
            />
            <label htmlFor="throttling" className="ml-2 text-sm text-gray-700">
              Enable email throttling (100 emails per hour)
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="tracking"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              defaultChecked
            />
            <label htmlFor="tracking" className="ml-2 text-sm text-gray-700">
              Enable email tracking (opens, clicks)
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="unsubscribe"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              defaultChecked
            />
            <label htmlFor="unsubscribe" className="ml-2 text-sm text-gray-700">
              Include unsubscribe link in all emails
            </label>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button icon={<Save size={16} />}>
            Save Settings
          </Button>
        </div>
      </div>
    </Card>
  );
};

const AISettings: React.FC = () => {
  return (
    <Card title="AI Configuration">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">AI Service</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Grok</h4>
                <input
                  type="radio"
                  name="aiService"
                  className="h-4 w-4 text-indigo-600 border-gray-300"
                  defaultChecked
                />
              </div>
              <p className="text-sm text-gray-500">
                Recommended for complex personalization and custom hooks generation.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">OpenAI GPT-4</h4>
                <input
                  type="radio"
                  name="aiService"
                  className="h-4 w-4 text-indigo-600 border-gray-300"
                />
              </div>
              <p className="text-sm text-gray-500">
                Powerful general purpose AI with good personalization capabilities.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Hugging Face</h4>
                <input
                  type="radio"
                  name="aiService"
                  className="h-4 w-4 text-indigo-600 border-gray-300"
                />
              </div>
              <p className="text-sm text-gray-500">
                Open-source models for basic personalization. More customizable.
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">AI Personalization Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                API Key
              </label>
              <input
                type="password"
                id="apiKey"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue="sk-••••••••••••••••••••••••••••••"
              />
            </div>
            
            <div>
              <label htmlFor="creativity" className="block text-sm font-medium text-gray-700 mb-1">
                Creativity Level: 70%
              </label>
              <input
                type="range"
                id="creativity"
                min="0"
                max="100"
                defaultValue="70"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Conservative</span>
                <span>Balanced</span>
                <span>Creative</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">AI Features</h4>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="personalizedHooks"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="personalizedHooks" className="ml-2 text-sm text-gray-700">
                  Generate personalized achievement hooks
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="followupTone"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="followupTone" className="ml-2 text-sm text-gray-700">
                  Adjust follow-up tone based on recipient engagement
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="webScraping"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label htmlFor="webScraping" className="ml-2 text-sm text-gray-700">
                  Enable web scraping for missing achievement data
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            className="mr-3"
            onClick={() => {
              // This would be a real test in production
              alert('AI test successful. Hook generated: "Your renewable energy initiative is transforming India\'s sustainable future."');
            }}
          >
            Test Connection
          </Button>
          <Button icon={<Save size={16} />}>
            Save Configuration
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Other settings components (not showing detailed implementation for brevity)

const NotificationSettings: React.FC = () => {
  return (
    <Card title="Notification Settings">
      <div className="space-y-6">
        <p className="text-gray-500">Configure how and when you receive notifications about campaign activity.</p>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Email Notifications</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="campaignComplete" className="text-sm text-gray-700">
                Campaign completion
              </label>
              <input
                type="checkbox"
                id="campaignComplete"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                defaultChecked
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label htmlFor="highEngagement" className="text-sm text-gray-700">
                High engagement alerts
              </label>
              <input
                type="checkbox"
                id="highEngagement"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                defaultChecked
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label htmlFor="lowEngagement" className="text-sm text-gray-700">
                Low engagement warnings
              </label>
              <input
                type="checkbox"
                id="lowEngagement"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                defaultChecked
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label htmlFor="weeklyReport" className="text-sm text-gray-700">
                Weekly performance reports
              </label>
              <input
                type="checkbox"
                id="weeklyReport"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                defaultChecked
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button icon={<Save size={16} />}>
            Save Preferences
          </Button>
        </div>
      </div>
    </Card>
  );
};

const SecuritySettings: React.FC = () => {
  return (
    <Card title="Security Settings">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Change Password</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <Button>Update Password</Button>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Two-Factor Authentication</h3>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium text-gray-900">Two-factor authentication is disabled</p>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <Button variant="outline">Enable</Button>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Session Management</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Current Session</p>
                <p className="text-xs text-gray-500">Windows 10 • Chrome • New Delhi, India</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active Now
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const TeamSettings: React.FC = () => {
  const teamMembers = [
    { name: 'Manish Patel', email: 'manish@bharateconomicforum.org', role: 'Administrator' },
    { name: 'Priya Sharma', email: 'priya@bharateconomicforum.org', role: 'Editor' },
    { name: 'Rajesh Kumar', email: 'rajesh@bharateconomicforum.org', role: 'Viewer' }
  ];

  return (
    <Card title="Team Members">
      <div className="space-y-6">
        <p className="text-gray-500">Manage team members who have access to the VBDA Email Automation system.</p>
        
        <div className="flex justify-end mb-4">
          <Button>Add Team Member</Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamMembers.map((member, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default Settings;