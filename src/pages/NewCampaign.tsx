import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../contexts/DataContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { generateId } from '../utils/mockData';
import toast from 'react-hot-toast';
import { ChevronRight, ChevronLeft, Check, Users, FileText, Calendar } from 'lucide-react';

const NewCampaign: React.FC = () => {
  const navigate = useNavigate();
  const { templates, sequences, recipients, addCampaign } = useDataContext();
  
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: '',
    sequenceId: '',
    selectedRecipients: [] as string[],
    startDate: ''
  });
  
  const totalSteps = 4;
  
  const handleNext = () => {
    if (step === 1 && !campaignData.name) {
      toast.error('Please enter a campaign name');
      return;
    }
    
    if (step === 2 && !campaignData.sequenceId) {
      toast.error('Please select an email sequence');
      return;
    }
    
    if (step === 3 && campaignData.selectedRecipients.length === 0) {
      toast.error('Please select at least one recipient');
      return;
    }
    
    if (step === 4) {
      handleCreateCampaign();
      return;
    }
    
    setStep(step + 1);
  };
  
  const handleBack = () => {
    setStep(step - 1);
  };
  
  const handleCreateCampaign = () => {
    const newCampaign = {
      id: generateId(),
      name: campaignData.name,
      sequenceId: campaignData.sequenceId,
      recipientCount: campaignData.selectedRecipients.length,
      sentCount: 0,
      openCount: 0,
      responseCount: 0,
      status: 'draft' as const,
      startDate: campaignData.startDate || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    addCampaign(newCampaign);
    toast.success('Campaign created successfully');
    navigate('/campaigns');
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Campaign Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={campaignData.name}
                onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
                placeholder="E.g. VBDA 2025 Corporate Leaders Outreach"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Campaign Description (Optional)
              </label>
              <textarea
                id="description"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                placeholder="Describe the purpose and goals of this campaign..."
              />
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <p className="text-sm text-gray-600 mb-4">
              Select an email sequence for this campaign. This defines the initial invitation, follow-ups, and timing.
            </p>
            
            <div className="space-y-4">
              {sequences.map((sequence) => {
                const initialTemplate = templates.find(t => t.id === sequence.initialEmailId);
                const followUpTemplate = sequence.followUpEmailId ? templates.find(t => t.id === sequence.followUpEmailId) : null;
                const finalTemplate = sequence.finalReminderEmailId ? templates.find(t => t.id === sequence.finalReminderEmailId) : null;
                
                return (
                  <div 
                    key={sequence.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      campaignData.sequenceId === sequence.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'
                    }`}
                    onClick={() => setCampaignData({...campaignData, sequenceId: sequence.id})}
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{sequence.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {initialTemplate?.name} → 
                          {followUpTemplate ? ` ${followUpTemplate.name} (Day ${sequence.followUpDays})` : ''} → 
                          {finalTemplate ? ` ${finalTemplate.name} (Day ${sequence.finalReminderDays})` : ''}
                        </p>
                      </div>
                      
                      {campaignData.sequenceId === sequence.id && (
                        <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <p className="text-sm text-gray-600 mb-2">
              Select recipients for this campaign. You can filter and select specific groups.
            </p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm">
                <span className="font-medium">{campaignData.selectedRecipients.length}</span> of {recipients.length} recipients selected
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setCampaignData({...campaignData, selectedRecipients: []})}
                >
                  Clear All
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setCampaignData({...campaignData, selectedRecipients: recipients.map(r => r.id)})}
                >
                  Select All
                </Button>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden max-h-96 overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="w-12 px-4 py-3">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        checked={campaignData.selectedRecipients.length === recipients.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCampaignData({...campaignData, selectedRecipients: recipients.map(r => r.id)});
                          } else {
                            setCampaignData({...campaignData, selectedRecipients: []});
                          }
                        }}
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recipients.map((recipient) => (
                    <tr key={recipient.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          checked={campaignData.selectedRecipients.includes(recipient.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCampaignData({
                                ...campaignData, 
                                selectedRecipients: [...campaignData.selectedRecipients, recipient.id]
                              });
                            } else {
                              setCampaignData({
                                ...campaignData, 
                                selectedRecipients: campaignData.selectedRecipients.filter(id => id !== recipient.id)
                              });
                            }
                          }}
                        />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{recipient.firstName} {recipient.lastName}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{recipient.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{recipient.organization}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        
      case 4:
        const selectedSequence = sequences.find(seq => seq.id === campaignData.sequenceId);
        const initialTemplate = templates.find(t => t.id === selectedSequence?.initialEmailId);
        
        return (
          <div className="space-y-6">
            <p className="text-sm text-gray-600 mb-4">
              Review your campaign details and schedule when to start sending emails.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Campaign Details</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex">
                    <span className="text-sm font-medium text-gray-500 w-32">Name:</span>
                    <span className="text-sm text-gray-900">{campaignData.name}</span>
                  </div>
                  <div className="flex">
                    <span className="text-sm font-medium text-gray-500 w-32">Sequence:</span>
                    <span className="text-sm text-gray-900">{selectedSequence?.name}</span>
                  </div>
                  <div className="flex">
                    <span className="text-sm font-medium text-gray-500 w-32">Recipients:</span>
                    <span className="text-sm text-gray-900">{campaignData.selectedRecipients.length} selected</span>
                  </div>
                  <div className="flex">
                    <span className="text-sm font-medium text-gray-500 w-32">First Email:</span>
                    <span className="text-sm text-gray-900">{initialTemplate?.name}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date (Optional)
                </label>
                <input
                  type="date"
                  id="startDate"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={campaignData.startDate}
                  onChange={(e) => setCampaignData({...campaignData, startDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                />
                <p className="text-xs text-gray-500 mt-1">
                  If no date is selected, the campaign will be saved as a draft for manual activation later.
                </p>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-600">
            Step {step} of {totalSteps}
          </div>
          <div className="text-sm font-medium text-gray-600">
            {step === 1 ? 'Campaign Info' : 
             step === 2 ? 'Select Sequence' : 
             step === 3 ? 'Select Recipients' : 'Review & Schedule'}
          </div>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-300 ease-in-out" 
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Step Icons */}
      <div className="flex items-center justify-between mb-8 px-5">
        <StepIcon 
          icon={<Calendar size={18} />} 
          label="Info"
          active={step >= 1}
          complete={step > 1}
          onClick={() => step > 1 && setStep(1)}
        />
        <StepConnector active={step > 1} />
        <StepIcon 
          icon={<FileText size={18} />} 
          label="Sequence"
          active={step >= 2}
          complete={step > 2}
          onClick={() => step > 2 && setStep(2)}
        />
        <StepConnector active={step > 2} />
        <StepIcon 
          icon={<Users size={18} />} 
          label="Recipients"
          active={step >= 3}
          complete={step > 3}
          onClick={() => step > 3 && setStep(3)}
        />
        <StepConnector active={step > 3} />
        <StepIcon 
          icon={<Check size={18} />} 
          label="Review"
          active={step >= 4}
          complete={false}
        />
      </div>
      
      {/* Content Area */}
      <Card>
        <div className="min-h-[400px]">
          {renderStepContent()}
        </div>
        
        <div className="mt-8 flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => step > 1 ? handleBack() : navigate('/campaigns')}
            icon={<ChevronLeft size={16} />}
          >
            {step > 1 ? 'Back' : 'Cancel'}
          </Button>
          
          <Button 
            onClick={handleNext}
            icon={step < totalSteps ? <ChevronRight size={16} /> : undefined}
            iconPosition={step < totalSteps ? 'right' : undefined}
          >
            {step < totalSteps ? 'Next' : 'Create Campaign'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

interface StepIconProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  complete: boolean;
  onClick?: () => void;
}

const StepIcon: React.FC<StepIconProps> = ({ icon, label, active, complete, onClick }) => {
  return (
    <div 
      className="flex flex-col items-center cursor-pointer"
      onClick={onClick}
    >
      <div 
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
          complete ? 'bg-green-500 text-white' : 
          active ? 'bg-indigo-500 text-white' : 
          'bg-gray-200 text-gray-500'
        }`}
      >
        {complete ? <Check size={18} /> : icon}
      </div>
      <span className={`text-xs mt-1 ${active ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
        {label}
      </span>
    </div>
  );
};

interface StepConnectorProps {
  active: boolean;
}

const StepConnector: React.FC<StepConnectorProps> = ({ active }) => {
  return (
    <div className="w-16 h-0.5 bg-gray-200 relative">
      <div 
        className="absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-300 ease-in-out"
        style={{ width: active ? '100%' : '0%' }}
      ></div>
    </div>
  );
};

export default NewCampaign;