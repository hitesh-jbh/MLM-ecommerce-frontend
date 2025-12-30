import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icons from '../../ui/Icon';

const GenericTable = ({ columns, data, title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
      {/* 1. Slim Header */}
      {title && (
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-800">{title}</h2>
        </div>
      )}
      
      {/* 2. Compact Desktop Table View */}
      <div className="hidden sm:block w-full overflow-x-auto custom-scrollbar">
        <table className="w-full text-xs text-left border-collapse">
          <thead className="bg-slate-50 border-b border-gray-100">
            <tr>
              {columns.map((col, index) => (
                <th 
                  key={index} 
                  className="px-3 py-2.5 font-bold text-slate-500 uppercase text-[10px] tracking-tight whitespace-nowrap"
                  style={{ width: col.width || 'auto' }} // Optional width control
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {currentRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-blue-50/20 transition-colors">
                {columns.map((col, colIndex) => (
                  <td 
                    key={colIndex} 
                    className="px-3 py-2 whitespace-nowrap text-slate-600 truncate max-w-[150px]"
                    title={row[col.key]} // Shows full text on hover
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. Mobile: Vertical Card View (Enhanced Differentiation) */}
        <div className="sm:hidden">
        {currentRows.map((row, rowIndex) => (
            <div 
            key={rowIndex} 
            className={`p-4 space-y-2 border-b-4 border-gray-600 last:border-0 ${
                rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
            }`}
            >
            {/* Row Indicator (Optional: Helps user see which row they are on) */}
            <div className="flex justify-between border-b border-gray-400 pb-1 mb-2">
                <span className="text-[10px] font-bold text-amber-600">Entry #{indexOfFirstRow + rowIndex + 1}</span>
            </div>

            {columns.map((col, colIndex) => (
                <div key={colIndex} className="flex justify-between items-center gap-2">
                <span className="text-[9px] font-bold text-slate-400 uppercase">{col.header}</span>
                <div className="text-xs text-slate-800 font-medium">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                </div>
                </div>
            ))}
            </div>
        ))}
        </div>

      {/* 4. Compact Pagination Controls */}
      <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between bg-white">
        <p className="text-[10px] text-slate-400">
          Total: {data.length} entries
        </p>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 border border-gray-200 rounded disabled:opacity-30 hover:bg-slate-50"
          >
            <Icons icon="heroicons:chevron-left-solid" size={14} />
          </button>
          
          <span className="text-[10px] font-bold text-slate-600">
            {currentPage} / {totalPages}
          </span>
          
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 border border-gray-200 rounded disabled:opacity-30 hover:bg-slate-50"
          >
            <Icons icon="heroicons:chevron-right-solid" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericTable;