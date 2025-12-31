import React, { useState } from 'react';
import Icons from '../../ui/Icon';
import { GenericTable } from './GenericTable';
import KpiCard from "./KpiCards"
import { referData, referTable } from '../../../utils/Constants';

const ReferralCodeMgt = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisibleToAll, setIsVisibleToAll] = useState(true);

  const KpiData = [
        { id: "1", title: "Total Referral Codes", value: "320" },
        { id: "2", title: "Acrive Codes", value: "20" },
        { id: "3", title: "User Assigned", value: "20" },
        { id: "4", title: "Conversition Today", value: "20" },


    ];

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      code: formData.get('referralCode'),
      visible: isVisibleToAll,
      assignTo: formData.get('assignTo')
    };
    console.log("New Referral Data:", data);
    setIsModalOpen(false); // Close modal after submission
  };

  return (
    <div className="w-full px-4 py-6 md:px-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
          Referral Code Management
        </h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 rounded-md shadow-md hover:bg-gray-800 transition-all active:scale-95 w-full md:w-auto"
        >
          <Icons icon="heroicons:plus" size={18} className="text-white" />
          <span className="text-sm font-medium">Generate New Referral Code</span>
        </button>
      </div>
      
      {/* Table Section */}
      <div className='mt-10 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm'>
        <GenericTable columns={referTable} data={referData} />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {KpiData.map((item) => (
                <KpiCard key={item.id} {...item} />
            ))}
        </div>

      {/* --- REFERRAL CODE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Referal Code</h2>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Referral Code Details */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Referal Code Details</label>
                <input 
                  name="referralCode"
                  type="text" 
                  required
                  placeholder="Enter code (e.g. SUMMER50)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none transition-all"
                />
              </div>

              {/* Toggle Switch */}
              <div className="flex items-center gap-3">
                <button 
                  type="button"
                  onClick={() => setIsVisibleToAll(!isVisibleToAll)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isVisibleToAll ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <span 
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isVisibleToAll ? 'translate-x-6' : 'translate-x-1'}`} 
                  />
                </button>
                <span className="text-sm font-medium text-gray-700">Visible to all</span>
              </div>

              {/* Assign To */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Assign to</label>
                <input 
                  name="assignTo"
                  type="text" 
                  placeholder="Username or User ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none transition-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 text-sm font-bold text-white bg-black hover:bg-gray-800 rounded-md shadow-sm transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralCodeMgt;