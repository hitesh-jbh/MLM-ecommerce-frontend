import React, { useState } from 'react';
import Icons from '../../ui/Icon';

export const GenericTable = ({ columns, data, title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow) || [];
  const totalPages = Math.ceil((data?.length || 0) / rowsPerPage);

  // Handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when limit changes
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
      {/* 1. Header */}
      {title && (
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-800">{title}</h2>
        </div>
      )}
      
      {/* 2. Desktop Table View */}
      <div className="hidden sm:block w-full overflow-x-auto custom-scrollbar">
        <table className="w-full text-xs text-left border-collapse">
          <thead className="bg-slate-50 border-b border-gray-100">
            <tr>
              {columns.map((col, index) => (
                <th 
                  key={index} 
                  className="px-3 py-2.5 font-bold text-slate-500 uppercase text-[10px] tracking-tight whitespace-nowrap"
                  style={{ width: col.width || 'auto' }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {currentRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-blue-50/20 transition-colors">
                {columns.map((col, colIndex) => {
                  const cellValue = row[col.key];
                  const isSimpleValue = typeof cellValue === 'string' || typeof cellValue === 'number';
                  const tooltipText = isSimpleValue ? String(cellValue) : "";

                  return (
                    <td 
                      key={colIndex} 
                      className="px-3 py-2 whitespace-nowrap text-slate-600 truncate max-w-[200px]"
                      title={tooltipText} 
                    >
                      {col.render ? col.render(cellValue, row) : cellValue}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. Mobile Card View */}
      <div className="sm:hidden p-4 space-y-3">
        {currentRows.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            No data available
          </div>
        ) : (
          currentRows.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className="bg-gray-50 rounded-lg border border-gray-200 p-3 space-y-2"
            >
              {columns.map((col, colIndex) => {
                // Skip certain columns on mobile if needed, or show all
                const cellValue = row[col.key];
                
                return (
                  <div 
                    key={colIndex} 
                    className="flex items-start justify-between gap-2"
                  >
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      {col.header}:
                    </span>
                    <div className="text-right flex-1 max-w-[60%]">
                      {col.render ? (
                        <div className="text-xs text-gray-700 font-medium">
                          {col.render(cellValue, row)}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-700 font-medium truncate block">
                          {cellValue || '—'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>

      {/* 4. Pagination Controls */}
      <div className="px-4 py-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between bg-white gap-4">
        
        {/* Rows Per Page Selector */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Rows:</span>
          <select 
            value={rowsPerPage} 
            onChange={handleRowsPerPageChange}
            className="text-[10px] font-bold text-slate-600 bg-slate-50 border border-gray-200 rounded px-1 py-0.5 outline-none focus:border-black transition-colors cursor-pointer"
          >
            {[5, 10, 20, 50].map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>

        <p className="text-[10px] text-slate-400 font-medium">
          Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, data?.length || 0)} of {data?.length || 0}
        </p>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 border border-gray-200 rounded-md disabled:opacity-30 hover:bg-slate-50 transition-colors"
          >
            <Icons icon="heroicons:chevron-left-solid" size={14} />
          </button>
          
          <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">
            {currentPage} / {totalPages}
          </span>
          
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 border border-gray-200 rounded-md disabled:opacity-30 hover:bg-slate-50 transition-colors"
          >
            <Icons icon="heroicons:chevron-right-solid" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};



// import React, { useState } from 'react';
// import Icons from '../../ui/Icon';

// export const GenericTable = ({ columns, data, title }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5;

//   // Pagination Logic
//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow) || [];
//   const totalPages = Math.ceil((data?.length || 0) / rowsPerPage);

//   return (
//     <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
//       {/* 1. Header */}
//       {title && (
//         <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
//           <h2 className="text-base font-bold text-slate-800">{title}</h2>
//         </div>
//       )}
      
//       {/* 2. Desktop Table View */}
//       <div className="hidden sm:block w-full overflow-x-auto custom-scrollbar">
//         <table className="w-full text-xs text-left border-collapse">
//           <thead className="bg-slate-50 border-b border-gray-100">
//             <tr>
//               {columns.map((col, index) => (
//                 <th 
//                   key={index} 
//                   className="px-3 py-2.5 font-bold text-slate-500 uppercase text-[10px] tracking-tight whitespace-nowrap"
//                   style={{ width: col.width || 'auto' }}
//                 >
//                   {col.header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-50">
//             {currentRows.map((row, rowIndex) => (
//               <tr key={rowIndex} className="hover:bg-blue-50/20 transition-colors">
//                 {columns.map((col, colIndex) => {
//                   const cellValue = row[col.key];
                  
//                   // Fix: Only create a tooltip string if the value is a string or number
//                   // This prevents the [object Object] hover issue
//                   const isSimpleValue = typeof cellValue === 'string' || typeof cellValue === 'number';
//                   const tooltipText = isSimpleValue ? String(cellValue) : "";

//                   return (
//                     <td 
//                       key={colIndex} 
//                       className="px-3 py-2 whitespace-nowrap text-slate-600 truncate max-w-[200px]"
//                       title={tooltipText} 
//                     >
//                       {col.render ? col.render(cellValue, row) : cellValue}
//                     </td>
//                   );
//                 })}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* 3. Mobile Card View */}
//       <div className="sm:hidden">
//         {currentRows.map((row, rowIndex) => (
//           <div 
//             key={rowIndex} 
//             className={`p-4 space-y-2 border-b-4 border-gray-200 last:border-0 ${
//               rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
//             }`}
//           >
//             <div className="flex justify-between border-b border-gray-100 pb-1 mb-2">
//               <span className="text-[10px] font-bold text-amber-600 uppercase">
//                 Entry #{indexOfFirstRow + rowIndex + 1}
//               </span>
//             </div>

//             {columns.map((col, colIndex) => (
//               <div key={colIndex} className="flex justify-between items-start gap-4">
//                 <span className="text-[9px] font-bold text-slate-400 uppercase shrink-0 pt-0.5">
//                   {col.header}
//                 </span>
//                 <div className="text-xs text-slate-800 font-medium text-right">
//                   {col.render ? col.render(row[col.key], row) : row[col.key]}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>

//       {/* 4. Pagination Controls */}
//       <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between bg-white">
//         <p className="text-[10px] text-slate-400 font-medium">
//           Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, data.length)} of {data.length}
//         </p>
        
//         <div className="flex items-center gap-2">
//           <button 
//             onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//             disabled={currentPage === 1}
//             className="p-1.5 border border-gray-200 rounded-md disabled:opacity-30 hover:bg-slate-50 transition-colors"
//           >
//             <Icons icon="heroicons:chevron-left-solid" size={14} />
//           </button>
          
//           <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">
//             {currentPage} / {totalPages}
//           </span>
          
//           <button 
//             onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//             disabled={currentPage === totalPages}
//             className="p-1.5 border border-gray-200 rounded-md disabled:opacity-30 hover:bg-slate-50 transition-colors"
//           >
//             <Icons icon="heroicons:chevron-right-solid" size={14} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
