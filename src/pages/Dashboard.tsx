import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Calendar, BarChart, ChevronRight, Users, Mail, CheckCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useDataContext } from '../contexts/DataContext';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { analytics, campaigns } = useDataContext();
  
  // Prepare data for the chart
  const chartData = {
    labels: analytics.dailyStats.slice(-7).map(stat => stat.date.split('-').slice(1).join('/')),
    datasets: [
      {
        label: 'Emails Sent',
        data: analytics.dailyStats.slice(-7).map(stat => stat.sent),
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
      {
        label: 'Opened',
        data: analytics.dailyStats.slice(-7).map(stat => stat.opened),
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
      },
      {
        label: 'Responses',
        data: analytics.dailyStats.slice(-7).map(stat => stat.responded),
        backgroundColor: 'rgba(245, 158, 11, 0.5)',
        borderColor: 'rgb(245, 158, 11)',
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Welcome to VBDA Email Automation</h2>
        <Button 
          onClick={() => navigate('/campaigns/new')} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Create New Campaign
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Recipients"
          value={analytics.totalRecipients}
          icon={<Users className="h-6 w-6 text-blue-500" />}
          change="+12%"
          positive={true}
        />
        <StatCard
          title="Emails Sent"
          value={analytics.emailsSent}
          icon={<Mail className="h-6 w-6 text-purple-500" />}
          change="+8%"
          positive={true}
        />
        <StatCard
          title="Open Rate"
          value={`${Math.round((analytics.emailsOpened / analytics.emailsSent) * 100)}%`}
          icon={<CheckCircle className="h-6 w-6 text-green-500" />}
          change="+5%"
          positive={true}
        />
        <StatCard
          title="Response Rate"
          value={`${Math.round((analytics.responsesReceived / analytics.emailsSent) * 100)}%`}
          icon={<CheckCircle className="h-6 w-6 text-yellow-500" />}
          change="+3%"
          positive={true}
        />
      </div>
      
      {/* Charts and Active Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2" title="Email Activity (Last 7 Days)">
          <div className="h-80">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </Card>
        
        <Card title="Active Campaigns">
          <div className="space-y-4">
            {campaigns
              .filter(campaign => campaign.status === 'in-progress')
              .map(campaign => (
                <div 
                  key={campaign.id} 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-indigo-500 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-800">{campaign.name}</h4>
                      <p className="text-xs text-gray-500">
                        {campaign.sentCount} of {campaign.recipientCount} sent
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-green-600 font-medium mr-2">
                      {Math.round((campaign.openCount / campaign.sentCount) * 100)}% open rate
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
              
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => navigate('/campaigns')}
            >
              View All Campaigns
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickActionCard
          title="Upload Recipients"
          description="Import contact details from CSV"
          icon={<Users className="h-6 w-6" />}
          buttonText="Import CSV"
          onClick={() => navigate('/recipients')}
        />
        <QuickActionCard
          title="Create Email Template"
          description="Design personalized email templates"
          icon={<Mail className="h-6 w-6" />}
          buttonText="New Template"
          onClick={() => navigate('/templates')}
        />
        <QuickActionCard
          title="View Analytics"
          description="Track campaign performance"
          icon={<BarChart className="h-6 w-6" />}
          buttonText="See Analytics"
          onClick={() => navigate('/analytics')}
        />
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  change: string;
  positive: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, positive }) => {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-blue-50">{icon}</div>
      </div>
      <div className={`mt-2 flex items-center text-sm ${positive ? 'text-green-600' : 'text-red-600'}`}>
        <span>{change} from last month</span>
      </div>
    </Card>
  );
};

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  onClick: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ title, description, icon, buttonText, onClick }) => {
  return (
    <Card>
      <div className="flex flex-col items-center text-center">
        <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
        <Button variant="outline" onClick={onClick}>
          {buttonText}
        </Button>
      </div>
    </Card>
  );
};

export default Dashboard;