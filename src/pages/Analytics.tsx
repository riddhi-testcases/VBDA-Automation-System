import React, { useState } from 'react';
import { useDataContext } from '../contexts/DataContext';
import Card from '../components/ui/Card';
import { PieChart, ChevronDown, TrendingUp, Users, Mail, CheckCircle, AlertTriangle } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics: React.FC = () => {
  const { analytics, campaigns } = useDataContext();
  const [timeRange, setTimeRange] = useState<'7d' | '14d' | '30d' | 'all'>('14d');
  
  // Get filtered stats based on time range
  const getFilteredStats = () => {
    let daysToShow = 7;
    
    switch (timeRange) {
      case '7d':
        daysToShow = 7;
        break;
      case '14d':
        daysToShow = 14;
        break;
      case '30d':
        daysToShow = 30;
        break;
      case 'all':
        return analytics.dailyStats;
    }
    
    return analytics.dailyStats.slice(-daysToShow);
  };
  
  const filteredStats = getFilteredStats();
  
  // Email activity line chart data
  const lineChartData = {
    labels: filteredStats.map(stat => stat.date.split('-').slice(1).join('/')),
    datasets: [
      {
        label: 'Emails Sent',
        data: filteredStats.map(stat => stat.sent),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Opened',
        data: filteredStats.map(stat => stat.opened),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Responses',
        data: filteredStats.map(stat => stat.responded),
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.5)',
        tension: 0.4,
        fill: false,
      }
    ],
  };
  
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    hover: {
      mode: 'nearest' as const,
      intersect: true
    },
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
  
  // Response rates pie chart data
  const pieChartData = {
    labels: ['Confirmed', 'Declined', 'No Response', 'Pending'],
    datasets: [
      {
        data: [73, 24, 187, 91],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(107, 114, 128, 0.7)',
          'rgba(245, 158, 11, 0.7)',
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(239, 68, 68)',
          'rgb(107, 114, 128)',
          'rgb(245, 158, 11)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Campaign performance bar chart data
  const barChartData = {
    labels: campaigns.filter(c => c.sentCount > 0).map(c => c.name),
    datasets: [
      {
        label: 'Open Rate',
        data: campaigns.filter(c => c.sentCount > 0).map(c => Math.round((c.openCount / c.sentCount) * 100)),
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
      {
        label: 'Response Rate',
        data: campaigns.filter(c => c.sentCount > 0).map(c => Math.round((c.responseCount / c.sentCount) * 100)),
        backgroundColor: 'rgba(245, 158, 11, 0.7)',
        borderColor: 'rgb(245, 158, 11)',
        borderWidth: 1,
      },
    ],
  };
  
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Percentage (%)'
        }
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Email Campaign Analytics</h2>
        
        <div className="relative">
          <select
            className="appearance-none pl-3 pr-8 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
          >
            <option value="7d">Last 7 days</option>
            <option value="14d">Last 14 days</option>
            <option value="30d">Last 30 days</option>
            <option value="all">All time</option>
          </select>
          <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
        </div>
      </div>
      
      {/* Key Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Emails Sent</p>
              <p className="text-2xl font-semibold">{analytics.emailsSent}</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Open Rate</p>
              <p className="text-2xl font-semibold">{Math.round((analytics.emailsOpened / analytics.emailsSent) * 100)}%</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Response Rate</p>
              <p className="text-2xl font-semibold">{Math.round((analytics.responsesReceived / analytics.emailsSent) * 100)}%</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <Users size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Confirmed RSVPs</p>
              <p className="text-2xl font-semibold">{analytics.rsvpConfirmed}</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Email Activity">
          <div className="h-80">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </Card>
        
        <Card title="Response Distribution">
          <div className="h-80 flex items-center justify-center">
            <div className="w-3/4">
              <Pie data={pieChartData} />
            </div>
          </div>
        </Card>
      </div>
      
      <Card title="Campaign Performance Comparison">
        <div className="h-80">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </Card>
      
      {/* Performance Insights */}
      <Card title="Performance Insights">
        <div className="space-y-4">
          <div className="flex items-start p-3 bg-green-50 rounded-lg">
            <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
              <TrendingUp size={16} />
            </div>
            <div>
              <h4 className="font-medium text-green-800">High Open Rate</h4>
              <p className="text-sm text-green-700">
                Your email open rate of {Math.round((analytics.emailsOpened / analytics.emailsSent) * 100)}% is above the industry average of 21%.
                Compelling subject lines are resonating with recipients.
              </p>
            </div>
          </div>
          
          <div className="flex items-start p-3 bg-yellow-50 rounded-lg">
            <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3">
              <AlertTriangle size={16} />
            </div>
            <div>
              <h4 className="font-medium text-yellow-800">Response Rate Opportunity</h4>
              <p className="text-sm text-yellow-700">
                Consider strengthening the call-to-action in follow-up emails to increase response rates.
                Personalizing the achievement hook has shown a 14% higher response rate.
              </p>
            </div>
          </div>
          
          <div className="flex items-start p-3 bg-indigo-50 rounded-lg">
            <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 mr-3">
              <PieChart size={16} />
            </div>
            <div>
              <h4 className="font-medium text-indigo-800">Best Performing Time</h4>
              <p className="text-sm text-indigo-700">
                Emails sent on Tuesday and Wednesday mornings (9-11 AM) show 23% higher open rates.
                Consider scheduling future campaigns during these times.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;