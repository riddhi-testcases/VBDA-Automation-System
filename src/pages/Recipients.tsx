import React, { useState, useRef } from 'react';
import { useDataContext } from '../contexts/DataContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { parseCSV, generateCSVTemplate } from '../utils/csvParser';
import toast from 'react-hot-toast';
import { Download, Upload, Plus, Search, MoreHorizontal, Trash2, Edit, Mail } from 'lucide-react';

const Recipients: React.FC = () => {
  const { recipients, addRecipients } = useDataContext();
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const parsedRecipients = await parseCSV(file);
      addRecipients(parsedRecipients);
      toast.success(`Successfully imported ${parsedRecipients.length} recipients`);
    } catch (error) {
      toast.error('Error parsing CSV file. Please check the format.');
      console.error(error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const downloadCSVTemplate = () => {
    const csvContent = generateCSVTemplate();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'vbda_recipients_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRecipients = recipients.filter(recipient => 
    recipient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipient.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipient.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search recipients..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-80 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            icon={<Download size={16} />}
            onClick={downloadCSVTemplate}
          >
            Download Template
          </Button>
          
          <input
            type="file"
            ref={fileInputRef}
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <Button 
            icon={<Upload size={16} />}
            isLoading={isUploading}
            onClick={() => fileInputRef.current?.click()}
          >
            Import CSV
          </Button>
        </div>
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Achievement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecipients.map((recipient) => (
                <tr key={recipient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium">
                        {recipient.firstName[0]}{recipient.lastName[0]}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{recipient.firstName} {recipient.lastName}</div>
                        <div className="text-sm text-gray-500">{recipient.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recipient.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recipient.organization}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{recipient.achievement}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={recipient.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Mail size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredRecipients.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">No recipients found</p>
            <Button 
              variant="outline" 
              icon={<Plus size={16} />}
              onClick={() => fileInputRef.current?.click()}
            >
              Import Recipients
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

interface StatusBadgeProps {
  status: 'invited' | 'responded' | 'confirmed' | 'declined' | 'no-response';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'invited':
        return 'bg-blue-100 text-blue-800';
      case 'responded':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      case 'no-response':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'invited':
        return 'Invited';
      case 'responded':
        return 'Responded';
      case 'confirmed':
        return 'Confirmed';
      case 'declined':
        return 'Declined';
      case 'no-response':
        return 'No Response';
      default:
        return 'Unknown';
    }
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles()}`}>
      {getStatusText()}
    </span>
  );
};

export default Recipients;