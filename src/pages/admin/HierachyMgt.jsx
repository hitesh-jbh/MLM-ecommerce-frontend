import React from 'react';
import useSWR from 'swr';
import { useSelector } from 'react-redux';
import { GenericTable } from '../../components/partials/table/GenericTable.jsx';
import { hierachyTable } from '../../utils/constants.jsx';
import { userHierachy } from '../../utils/service/apiService.js'; // Adjust path as needed
import { Loader2 } from "lucide-react";

const HierachyMgt = () => {
  const { token } = useSelector((state) => state.auth);

  // Fetching data using SWR
  const { data: response, error, isLoading } = useSWR(
    token ? ['/api/admin/hierarchy', token] : null,
    ([_, tkn]) => userHierachy(tkn).then(res => res.data)
  );

  // Data Mapping: Convert API response to Table format
  const mappedData = React.useMemo(() => {
    if (!response?.data) return [];

    return response.data.map(item => ({
      level: item.level,
      // Map 'member' for the second column
      member: {
        name: `${item.firstName} ${item.lastName}`,
        avatar: item.imageUrl || "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
        id: item.referralCode // Displaying referral code as the ID
      },
      // Map direct members for the third column (Left side)
      directMembers: item.directMembers?.map(m => ({
        name: `${m.firstName} ${m.lastName}`,
        id: m.referralCode
      })) || [],
      // Assuming 'confirmedMembers' are the same as direct members for this view
      // or you can filter them based on 'isActive'
      confirmedMembers: item.directMembers?.filter(m => m.isActive === 1).map(m => ({
        name: `${m.firstName} ${m.lastName}`,
        id: m.referralCode
      })) || [],
      isChainComplete: item.chainCompleted
    })).sort((a, b) => a.level - b.level);
  }, [response]);

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center py-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-xl font-black text-slate-800 tracking-tight uppercase px-4">
          1 Member Earns Commission From 5 Persons
        </h1>
        <p className="text-slate-500 text-md mt-1 px-4">
          A new chain generates for further earnings once 5 persons are complete
        </p>
      </div>

      <GenericTable
        title="Hierarchy Structure" 
        columns={hierachyTable} 
        data={mappedData} 
      />
    </div>
  );
};

export default HierachyMgt;

