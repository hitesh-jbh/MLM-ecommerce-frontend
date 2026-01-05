import React, { useState } from 'react';
import { 
  FiPlus, 
  FiEye, 
  FiFolder, 
  FiMoreVertical,
  FiMail,
  FiDollarSign,
  FiUsers,
  FiChevronUp,
  FiChevronDown,
  FiTrendingUp,
  FiTrendingDown,
  FiCalendar,
  FiChevronRight,
  FiChevronLeft
} from 'react-icons/fi';
import { 
  TbBrandWhatsapp 
} from 'react-icons/tb';

const CampaignDashboard = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('all');
  
  // State for second table active tab
  const [activeTab2, setActiveTab2] = useState('all');
  
  // State for campaigns data (First Table)
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Diwali Offer',
      channel: 'Email',
      sent: 500,
      opened: 320,
      sales: 45,
      revenue: 32000,
      status: 'active',
      category: 'promotional'
    },
    {
      id: 2,
      name: 'New Products Launch',
      channel: 'WhatsApp',
      sent: 800,
      opened: 650,
      sales: 120,
      revenue: 85000,
      status: 'active',
      category: 'product'
    },
    {
      id: 3,
      name: 'Referral Bonus',
      channel: 'Email',
      sent: 300,
      opened: 280,
      sales: 65,
      revenue: 45000,
      status: 'completed',
      category: 'referral'
    },
    {
      id: 4,
      name: 'Flash Sale',
      channel: 'WhatsApp',
      sent: 1000,
      opened: 850,
      sales: 200,
      revenue: 150000,
      status: 'active',
      category: 'promotional'
    },
    {
      id: 5,
      name: 'Newsletter',
      channel: 'Email',
      sent: 1500,
      opened: 1200,
      sales: 80,
      revenue: 28000,
      status: 'paused',
      category: 'newsletter'
    }
  ]);

  // Data for second table
  const [completedCampaigns, setCompletedCampaigns] = useState([
    {
      id: 101,
      name: 'Summer Sale 2024',
      channel: 'Email',
      sent: 2000,
      opened: 1500,
      sales: 180,
      revenue: 120000,
      status: 'completed',
      category: 'promotional',
      completionDate: '2024-08-15'
    },
    {
      id: 102,
      name: 'Black Friday',
      channel: 'WhatsApp',
      sent: 3000,
      opened: 2500,
      sales: 350,
      revenue: 280000,
      status: 'completed',
      category: 'promotional',
      completionDate: '2024-11-29'
    },
    {
      id: 103,
      name: 'Product Feedback',
      channel: 'Email',
      sent: 1200,
      opened: 900,
      sales: 0,
      revenue: 0,
      status: 'completed',
      category: 'feedback',
      completionDate: '2024-09-10'
    },
   
  ]);

  // Handle view action
  const handleView = (id, table) => {
    alert(`Viewing campaign #${id} from ${table}`);
  };

  // Handle folder action
  const handleFolder = (id, table) => {
    alert(`Opening folder for campaign #${id} from ${table}`);
  };

  // Handle more options
  const handleMoreOptions = (id, table) => {
    alert(`More options for campaign #${id} from ${table}`);
  };

  // Handle create category
  const handleCreateCategory = (table) => {
    const categoryName = prompt(`Enter category name for ${table}:`);
    if (categoryName) {
      alert(`Created new category for ${table}: ${categoryName}`);
    }
  };

  // Filter campaigns based on active tab (First Table)
  const filteredCampaigns = activeTab === 'all' 
    ? campaigns 
    : campaigns.filter(campaign => 
        activeTab === 'email' ? campaign.channel === 'Email' : 
        activeTab === 'whatsapp' ? campaign.channel === 'WhatsApp' : 
        campaign.category === activeTab
      );

  // Filter completed campaigns based on active tab (Second Table)
  const filteredCompletedCampaigns = activeTab2 === 'all' 
    ? completedCampaigns 
    : activeTab2 === 'email' 
      ? completedCampaigns.filter(campaign => campaign.channel === 'Email')
      : activeTab2 === 'whatsapp' 
        ? completedCampaigns.filter(campaign => campaign.channel === 'WhatsApp')
        : completedCampaigns.filter(campaign => campaign.category === activeTab2);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Campaign Dashboard</h1>
        <p className="text-gray-600">Active and Completed Campaigns Overview</p>
      </div>

      {/* First Table Card - Active Campaigns */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        {/* Card Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Active Campaigns</h2>
              <p className="text-gray-600 mt-1">Currently running marketing campaigns</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Active</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span>Paused</span>
              </div>
            </div>
          </div>
        </div>

        {/* Header with Tabs and Create Button */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('all')}
              >
                All Campaigns
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${activeTab === 'email' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('email')}
              >
                <FiMail />
                Email
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${activeTab === 'whatsapp' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('whatsapp')}
              >
                <TbBrandWhatsapp />
                WhatsApp
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'promotional' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('promotional')}
              >
                Promotional
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'newsletter' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('newsletter')}
              >
                Newsletter
              </button>
            </div>
            
            <button
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              onClick={() => handleCreateCategory('Active Campaigns')}
            >
              <FiPlus />
              Create Category
            </button>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opened</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">ID: {campaign.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {campaign.channel === 'Email' ? (
                        <FiMail className="text-blue-500" />
                      ) : (
                        <TbBrandWhatsapp className="text-green-500" />
                      )}
                      <span>{campaign.channel}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium">{campaign.sent}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="font-medium">{campaign.opened}</span>
                      <div className="text-sm text-gray-500">
                        ({Math.round((campaign.opened / campaign.sent) * 100)}%)
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium">{campaign.sales}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <FiDollarSign className="text-gray-400" />
                      <span className="font-bold text-gray-900">{campaign.revenue.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => handleView(campaign.id, 'Active Campaigns')}
                        title="View"
                      >
                        <FiEye />
                      </button>
                      <button
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        onClick={() => handleFolder(campaign.id, 'Active Campaigns')}
                        title="Open Folder"
                      >
                        <FiFolder />
                      </button>
                      <div className="relative">
                        <button
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          onClick={() => handleMoreOptions(campaign.id, 'Active Campaigns')}
                          title="More Options"
                        >
                          <FiMoreVertical />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {filteredCampaigns.length} of {campaigns.length} active campaigns
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <FiChevronLeft />
                Previous
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                Next
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Second Table Card - Completed Campaigns */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Card Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Completed Campaigns</h2>
              <p className="text-gray-600 mt-1">Historical campaign performance data</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FiCalendar className="text-gray-500" />
                <span>Completed Date Range</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg">
                <span className="text-sm font-medium">2024 Campaigns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Header with Tabs and Create Button */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab2 === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab2('all')}
              >
                All Completed
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${activeTab2 === 'email' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab2('email')}
              >
                <FiMail />
                Email
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${activeTab2 === 'whatsapp' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab2('whatsapp')}
              >
                <TbBrandWhatsapp />
                WhatsApp
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab2 === 'promotional' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab2('promotional')}
              >
                Promotional
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab2 === 'feedback' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab2('feedback')}
              >
                Feedback
              </button>
            </div>
            
            <button
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              onClick={() => handleCreateCategory('Completed Campaigns')}
            >
              <FiPlus />
              Create Category
            </button>
          </div>
        </div>

        {/* Completed Campaigns Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opened</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCompletedCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">
                        ID: {campaign.id} • Completed: {new Date(campaign.completionDate).toLocaleDateString('en-US', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {campaign.channel === 'Email' ? (
                        <FiMail className="text-blue-500" />
                      ) : (
                        <TbBrandWhatsapp className="text-green-500" />
                      )}
                      <span>{campaign.channel}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium">{campaign.sent}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="font-medium">{campaign.opened}</span>
                      <div className="text-sm text-gray-500">
                        ({Math.round((campaign.opened / campaign.sent) * 100)}%)
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium">{campaign.sales}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <FiDollarSign className="text-gray-400" />
                      <span className="font-bold text-gray-900">{campaign.revenue.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => handleView(campaign.id, 'Completed Campaigns')}
                        title="View"
                      >
                        <FiEye />
                      </button>
                      <button
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        onClick={() => handleFolder(campaign.id, 'Completed Campaigns')}
                        title="Open Folder"
                      >
                        <FiFolder />
                      </button>
                      <div className="relative">
                        <button
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          onClick={() => handleMoreOptions(campaign.id, 'Completed Campaigns')}
                          title="More Options"
                        >
                          <FiMoreVertical />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
       
      </div>
    </div>
  );
};

export default CampaignDashboard;