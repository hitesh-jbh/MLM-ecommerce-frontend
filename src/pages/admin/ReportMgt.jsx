import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import { GenericTable } from '../../components/partials/table/GenericTable';
import { referTable } from '../../utils/Constants'; 
import { fetcher } from "../../utils/api/axiosInstance";
import Icons from '../../components/ui/Icon';
import { Search, X, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

const ReportMgt = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Fetching data from the API
  const { data: response, error, isLoading, mutate } = useSWR(
    "/api/admin/reports/referral-activity",
    fetcher
  );

  // 2. Safely Extracting Data (Handles different API response structures)
  const reportData = useMemo(() => {
    const rawData = response?.data?.data || response?.data || response || [];
    return Array.isArray(rawData) ? rawData : [];
  }, [response]);


//   const filteredData = useMemo(() => {
//   const query = searchQuery.toLowerCase().trim();
//   if (!query) return reportData;

//   return reportData.filter(item => {
//     // Check the primary referral_code field
//     const code = (item.referral_code || item.referralCode || "").toLowerCase();
    
//     // Check secondary fields for better search coverage
//     const user = (item.userName || "").toLowerCase();
//     const token = (item.token || item.referralToken || "").toLowerCase();

//     return code.includes(query) || user.includes(query) || token.includes(query);
//   });
// }, [reportData, searchQuery]);
  // 3. Filtering logic - Includes Referral Token, Name, and Code
  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return reportData;

    return reportData.filter(item => {
      // Define the searchable fields
      const userName = (item.userName || "").toLowerCase();
      const referralCode = (item.referralCode || "").toLowerCase();
      const assignedTo = (item.assignedTo || "").toLowerCase();
      
      // FIX: Explicitly check various possible keys for the Referral Token
      const referralToken = (
        item.referralToken || 
        item.token || 
        item.referral_token || 
        item.id || ""
      ).toString().toLowerCase();

      return (
        userName.includes(query) ||
        referralCode.includes(query) ||
        assignedTo.includes(query) ||
        referralToken.includes(query)
      );
    });
  }, [reportData, searchQuery]);

  return (
    <div className="w-full px-4 py-6 md:px-8 bg-[#F9FAFB] min-h-screen">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 mb-8 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-black text-[#1A1C1E] tracking-tight uppercase">
            Referral Analytics
          </h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">
            Track Tokens, Codes & User Activity
          </p>
        </div>
        
        {/* Advanced Search Input */}
        <div className="relative group w-full md:w-[450px]">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors">
             <Search size={18} strokeWidth={3} />
          </div>
          <input
            type="text"
            placeholder="Search by Referral Token, Name, or Code..."
            className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-gray-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-black shadow-sm transition-all placeholder:text-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-black transition-colors"
            >
              <X size={16} strokeWidth={3} />
            </button>
          )}
        </div>
      </div>
      
      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden relative">
        {/* Table Toolbar */}
        <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-white">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-1">
                Data Stream
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-black">
                  {filteredData.length}
                </span>
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                  Entries Found
                </span>
              </div>
            </div>

            <button 
              onClick={() => mutate()}
              className="p-2.5 hover:bg-gray-50 rounded-xl border border-gray-100 transition-all active:scale-90"
            >
              <RefreshCw 
                size={18} 
                className={`${isLoading ? 'animate-spin' : ''} text-gray-400`} 
              />
            </button>
        </div>
        
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
              <Loader2 className="animate-spin text-black mb-2" size={32} />
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Loading Records...</p>
            </div>
          ) : error ? (
            <div className="py-32 text-center flex flex-col items-center">
              <div className="p-4 bg-red-50 rounded-full mb-4">
                <AlertCircle size={32} className="text-red-500" />
              </div>
              <h4 className="text-sm font-black text-gray-800 uppercase">Sync Failed</h4>
              <p className="text-xs text-gray-400 font-bold mt-1">Check your network connection</p>
            </div>
          ) : filteredData.length > 0 ? (
            <div className="p-2">
               <GenericTable 
                columns={referTable} 
                data={filteredData} 
                title="Referral Activity"
              />
            </div>
          ) : (
            <div className="py-32 text-center flex flex-col items-center opacity-30">
              <Search size={48} strokeWidth={1} className="mb-4" />
              <p className="text-xs font-black uppercase tracking-widest">No matching records found</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="mt-8 text-center">
        <p className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.4em]">
          Referral Management System • Secure Audit Trail
        </p>
      </div>
    </div>
  );
};

export default ReportMgt;