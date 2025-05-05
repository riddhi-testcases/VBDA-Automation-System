import React, { useState } from 'react';
import { useDataContext } from '../contexts/DataContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { generateId } from '../utils/mockData';
import { personalizeEmailBody, personalizeEmailSubject } from '../utils/aiPersonalization';
import toast from 'react-hot-toast';
import { FileText, Edit, Trash2, Copy, Plus, Eye } from 'lucide-react';

const Templates: React.FC = () => {
  const { templates, addTemplate, updateTemplate } = useDataContext();
  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    subject: '',
    body: '',
    type: 'invitation' as 'invitation' | 'followup' | 'final-reminder'
  });

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.subject || !newTemplate.body) {
      toast.error('Please fill in all fields');
      return;
    }

    const template = {
      id: generateId(),
      name: newTemplate.name,
      subject: newTemplate.subject,
      body: newTemplate.body,
      type: newTemplate.type,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    addTemplate(template);
    toast.success('Template created successfully');
    setNewTemplate({
      name: '',
      subject: '',
      body: '',
      type: 'invitation'
    });
    setShowNewTemplate(false);
  };

  const handlePreview = (templateId: string) => {
    setSelectedTemplate(templateId);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Email Templates</h2>
        <Button 
          onClick={() => setShowNewTemplate(!showNewTemplate)}
          icon={showNewTemplate ? undefined : <Plus size={16} />}
        >
          {showNewTemplate ? 'Cancel' : 'New Template'}
        </Button>
      </div>

      {/* New Template Form */}
      {showNewTemplate && (
        <Card title="Create New Template">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Template Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                placeholder="E.g. Initial Invitation"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Template Type
              </label>
              <select
                id="type"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newTemplate.type}
                onChange={(e) => setNewTemplate({...newTemplate, type: e.target.value as any})}
              >
                <option value="invitation">Initial Invitation</option>
                <option value="followup">Follow-Up</option>
                <option value="final-reminder">Final Reminder</option>
              </select>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Email Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newTemplate.subject}
                onChange={(e) => setNewTemplate({...newTemplate, subject: e.target.value})}
                placeholder="E.g. {FirstName}, Join Us at Viksit Bharat Dialogues & Awards 2025"
              />
            </div>

            <div>
              <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                Email Body
              </label>
              <div className="mb-2 text-xs text-gray-500">
                Use placeholders like {'{FirstName}'}, {'{Organization}'}, {'{Achievement}'} for personalization
              </div>
              <textarea
                id="body"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-60"
                value={newTemplate.body}
                onChange={(e) => setNewTemplate({...newTemplate, body: e.target.value})}
                placeholder="Dear {FirstName},

Your {Achievement} is impressive and aligns with Viksit Bharat 2047 vision.

The Bharat Economic Forum (BEF) invites you to the Viksit Bharat Dialogues & Awards (VBDA) on 25th July 2025 at Bharat Mandapam, New Delhi..."
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleCreateTemplate}>
                Create Template
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 mr-3">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{template.name}</h3>
                <p className="text-xs text-gray-500">
                  {template.type === 'invitation' ? 'Initial Invitation' : 
                   template.type === 'followup' ? 'Follow-Up' : 'Final Reminder'}
                </p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600">Subject:</p>
              <p className="text-sm text-gray-800">{template.subject}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600">Preview:</p>
              <p className="text-sm text-gray-800 line-clamp-2">{template.body.substring(0, 100)}...</p>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">
                Last updated: {new Date(template.updatedAt).toLocaleDateString()}
              </p>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handlePreview(template.id)}
                  className="p-1 text-gray-500 hover:text-indigo-600"
                >
                  <Eye size={18} />
                </button>
                <button className="p-1 text-gray-500 hover:text-indigo-600">
                  <Edit size={18} />
                </button>
                <button className="p-1 text-gray-500 hover:text-red-600">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Preview Modal */}
      {showPreview && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            {(() => {
              const template = templates.find(t => t.id === selectedTemplate);
              if (!template) return null;

              // Sample preview data
              const previewData = {
                firstName: 'Amit',
                lastName: 'Sharma',
                organization: 'TechInnovators India',
                role: 'CEO',
                achievement: '$50M renewable energy initiative',
                source: 'Economic Times, March 2025'
              };

              const subject = personalizeEmailSubject(template.subject, previewData);
              const body = personalizeEmailBody(template.body, previewData);

              return (
                <>
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-800">Template Preview</h3>
                    <button 
                      onClick={handleClosePreview}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-600">From:</p>
                        <p className="text-sm text-gray-800">Manish Patel &lt;contact@bharateconomicforum.org&gt;</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-600">To:</p>
                        <p className="text-sm text-gray-800">{previewData.firstName} {previewData.lastName} &lt;{previewData.firstName.toLowerCase()}.{previewData.lastName.toLowerCase()}@example.com&gt;</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-600">Subject:</p>
                        <p className="text-sm text-gray-800">{subject}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Body:</p>
                        <div className="bg-white border border-gray-200 rounded p-4 whitespace-pre-wrap text-sm text-gray-800">
                          {body}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4 space-x-3">
                      <Button 
                        variant="outline" 
                        onClick={handleClosePreview}
                      >
                        Close
                      </Button>
                      <Button 
                        variant="primary" 
                        icon={<Copy size={16} />}
                        onClick={() => {
                          navigator.clipboard.writeText(body);
                          toast.success('Template copied to clipboard');
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Templates;