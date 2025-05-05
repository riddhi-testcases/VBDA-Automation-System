import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../contexts/DataContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Calendar, Play, Pause, BarChart2, Mail, Plus } from 'lucide-react';

const Campaigns: React.FC = () => {
  const navigate = useNavigate();
  const { campaigns, sequences } = useDataContext();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Email Campaigns</h2>
        <Button 
          onClick={() => navigate('/campaigns/new')} 
          icon={<Plus size={16} />}
        >
          New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {campaigns.map((campaign) => {
          const sequence = sequences.find(seq => seq.id === campaign.sequenceId);
          
          // Calculate progress percentage
          const progress = campaign.sentCount > 0 
            ? Math.round((campaign.sentCount / campaign.recipientCount) * 100) 
            : 0;
            
          // Calculate open rate
          const openRate = campaign.sentCount > 0 
            ? Math.round((campaign.openCount / campaign.sentCount) * 100) 
            : 0;
            
          // Calculate response rate
          const responseRate = campaign.sentCount > 0 
            ? Math.round((campaign.responseCount / campaign.sentCount) * 100) 
            : 0;

          return (
            <Card key={campaign.id}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{campaign.name}</h3>
                    <p className="text-sm text-gray-500">
                      Sequence: {sequence?.name || 'Unknown'}
                    </p>
                    <div className="flex items-center mt-1">
                      <StatusBadge status={campaign.status} />
                      {campaign.startDate && (
                        <span className="ml-2 text-xs text-gray-500 flex items-center">
                          <Calendar size={12} className="mr-1" />
                          Started: {new Date(campaign.startDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex flex-col md:items-end">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className="font-medium">{campaign.sentCount}/{campaign.recipientCount} sent</span>
                    <span>•</span>
                    <span>{openRate}% opened</span>
                    <span>•</span>
                    <span>{responseRate}% responded</span>
                  </div>
                  
                  <div className="w-full md:w-60 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    {campaign.status === 'draft' && (
                      <Button 
                        size="sm" 
                        icon={<Play size={14} />}
                      >
                        Start
                      </Button>
                    )}
                    
                    {campaign.status === 'in-progress' && (
                      <Button 
                        size="sm" 
                        variant="secondary"
                        icon={<Pause size={14} />}
                      >
                        Pause
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      icon={<BarChart2 size={14} />}
                    >
                      Analytics
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      {campaigns.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center p-4 bg-indigo-100 rounded-full text-indigo-600 mb-4">
              <Mail size={30} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No campaigns yet</h3>
            <p className="text-gray-500 mb-6">Create your first campaign to start sending personalized emails</p>
            <Button 
              onClick={() => navigate('/campaigns/new')}
              icon={<Plus size={16} />}
            >
              Create Campaign
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

interface StatusBadgeProps {
  status: 'draft' | 'scheduled' | 'in-progress' | 'completed';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'draft':
        return 'Draft';
      case 'scheduled':
        return 'Scheduled';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full ${getStatusStyles()}`}>
      {getStatusText()}
    </span>
  );
};

export default Campaigns;