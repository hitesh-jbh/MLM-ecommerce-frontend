import React from 'react';
import { GenericTable } from './GenericTable.jsx';
import Icons from '../../components/ui/Icon.jsx';
import { hierachyTable, hierachyData } from '../../utils/Constants.jsx';

const HierachyMgt = () => {

  const sortedData = hierachyData.sort((a, b) => a.level - b.level);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="text-center py-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-xl font-black text-slate-800 tracking-tight uppercase px-4">
          1 Member Earns Commission From 5 Persons
        </h1>
        <p className="text-slate-500 text-md mt-1 px-4">
          A new chain generates for further earnings once 5 persons are complete
        </p>
      </div>

      {/* Your Generic Table Integration */}
      <GenericTable
        title="Hierarchy Structure" 
        columns={hierachyTable} 
        data={sortedData} 
      />
    </div>
  );
};

export default HierachyMgt;