import React, { useState, useRef } from 'react';
import { FaChevronDown, FaSearch, FaFolderOpen, FaUpload, FaFile } from 'react-icons/fa';

const CompactCommissionConfig = () => {
  const [filters, setFilters] = useState({
    user: 'All Users',
    type: 'All Types',
    level: 'All Levels',
    status: 'All Statuses',
    period: 'Dec 2023, 2025 - Dec 24 2025'
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      console.log('Selected file:', file.name);
      // यहाँ आप फ़ाइल अपलोड का लॉजिक add कर सकते हैं
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const filterOptions = [
    { key: 'user', label: 'Users', width: 'w-28' },
    { key: 'type', label: 'Types', width: 'w-28' },
    { key: 'level', label: 'Levels', width: 'w-28' },
    { key: 'status', label: 'Statuses', width: 'w-28' }
  ];

  return (
    <div className="p-5 bg-white rounded-lg border border-gray-300 shadow-sm">
      {/* Line 1 */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap items-center gap-4">
          <h3 className="text-lg font-bold text-gray-900">Commission Configuration</h3>
          <div className="relative">
            <select
              value={filters.user}
              onChange={(e) => handleFilterChange('user', e.target.value)}
              className="w-32 px-3 py-2 text-sm border border-gray-400 rounded-md bg-white text-gray-900 appearance-none font-medium"
            >
              <option>All Users</option>
              <option>User A</option>
              <option>User B</option>
              <option>User C</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={14} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Folder/File Upload Section - अलग लेबल में */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-600 mb-1">Import/Export Data</label>
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={filters.period}
                  onChange={(e) => handleFilterChange('period', e.target.value)}
                  className="w-48 px-3 py-2 text-sm border border-gray-400 rounded-md bg-white text-gray-900 appearance-none font-medium"
                >
                  <option>Dec 23 2025 - Dec 24 2025</option>
                 
                </select>
               
              </div>
              
              {/* File Upload Button */}
              <div className="relative">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".csv,.xlsx,.xls,.pdf"
                />
                <button
                  onClick={handleFileUploadClick}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <FaFolderOpen size={14} />
                  <span>Upload</span>
                </button>
              </div>
              
              <button className="p-2.5 border border-gray-400 rounded-md hover:bg-gray-50 transition-colors">
                <FaSearch className="text-gray-700" size={16} />
              </button>
            </div>
            
            {/* Selected File Name Display */}
            {fileName && (
              <div className="mt-2 flex items-center gap-2 text-xs text-green-600">
                <FaFile size={12} />
                <span className="truncate max-w-xs">{fileName}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Line 2 */}
      <div className="flex flex-wrap items-center gap-4">
        <p className="text-base font-semibold text-gray-800">Direct referral commission</p>
        <div className="flex flex-wrap items-center gap-3">
          {filterOptions.slice(1).map(({ key, label, width }) => (
            <div key={key} className="relative">
              <select
                value={filters[key]}
                onChange={(e) => handleFilterChange(key, e.target.value)}
                className={`${width} px-3 py-2 text-sm border border-gray-400 rounded-md bg-white text-gray-900 appearance-none font-medium`}
              >
                <option>All {label}</option>
                <option>{label} 1</option>
                <option>{label} 2</option>
                <option>{label} 3</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={12} />
            </div>
          ))}
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <FaSearch size={14} />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompactCommissionConfig;