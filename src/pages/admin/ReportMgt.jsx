import React, { useState } from 'react';
import Icons from "../../components/ui/Icon";
import { GenericTable } from "../../components/partials/table/GenericTable";
import KpiCard from "./KpiCards"
import { pieReportData, referData, referTable } from '../../utils/Constants';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const ReportMgt = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisibleToAll, setIsVisibleToAll] = useState(true);

  const KpiData = [
    { id: "1", title: "Total Referral Codes", value: "320", icon: "solar:SimCard-bold-duotone" },
    { id: "2", title: "Active Codes", value: "248", icon: "solar:check-circle-bold-duotone" },
    { id: "3", title: "User Assigned", value: "192", icon: "solar:user-plus-bold-duotone" },
    { id: "4", title: "Conversion Today", value: "12", icon: "solar:graph-up-bold-duotone" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      code: formData.get('referralCode'),
      visible: isVisibleToAll,
      assignTo: formData.get('assignTo')
    };
    console.log("New Referral Data:", data);
    // Here you would typically call: await api.post('/api/referrals', data);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full px-4 py-6 md:px-8 bg-[#FDFDFD] min-h-screen">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-black tracking-tight uppercase">
            Referral Analytics
          </h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Management & Tracking</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-sm shadow-xl hover:bg-gray-800 transition-all active:scale-95 w-full md:w-auto"
        >
          <Icons icon="solar:add-circle-bold" size={18} />
          <span className="text-xs font-bold uppercase tracking-widest">Generate Code</span>
        </button>
      </div>

      {/* Top Section: Pie Chart & KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        
        {/* Analytics Card (Full Pie Chart) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-sm border border-gray-100 shadow-sm flex flex-col items-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 self-start">
                Referral Distribution
            </h3>
            <div className="w-full h-[240px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieReportData}
                            cx="50%"
                            cy="50%"
                            // 1. Set innerRadius to 0 to make it a solid Pie Chart
                            innerRadius={0} 
                            outerRadius="90%"
                            dataKey="value"
                            labelLine={false}
                            // 2. Added labels for better readability on solid charts
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {pieReportData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ fontSize: '12px', fontWeight: 'bold', borderRadius: '8px' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
      
      {/* Table Section */}
      <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Recent Referral Activity</h3>
            <button className="text-[10px] font-bold uppercase text-gray-400 hover:text-black transition-colors">View All</button>
        </div>
        <div className="overflow-x-auto">
            <GenericTable columns={referTable} data={referData} />
        </div>
      </div>

      {/* Modal - Refined Styling */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-sm shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
            <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-black">New Referral Code</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black">
                <Icons icon="solar:close-circle-bold" size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Code Details</label>
                <input 
                  name="referralCode"
                  type="text" 
                  required
                  placeholder="GENTLE2026"
                  className="w-full px-4 py-3 bg-gray-50 border-b-2 border-transparent focus:border-black outline-none transition-all text-sm font-bold uppercase tracking-widest"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-sm">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Visible to all users</span>
                <button 
                  type="button"
                  onClick={() => setIsVisibleToAll(!isVisibleToAll)}
                  className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${isVisibleToAll ? 'bg-black' : 'bg-gray-300'}`}
                >
                  <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isVisibleToAll ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Assign to User</label>
                <input 
                  name="assignTo"
                  type="text" 
                  placeholder="Enter User ID or Email"
                  className="w-full px-4 py-3 bg-gray-50 border-b-2 border-transparent focus:border-black outline-none transition-all text-sm"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gray-900 shadow-xl transition-all active:scale-95"
              >
                Create Referral
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportMgt;