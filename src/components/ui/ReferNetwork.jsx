import React, { useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import Icons from "./Icon";

const NetworkNode = ({ person, level, isRoot, isHighlighted }) => (
  <div className="inline-block">
    <div 
      className={`flex items-center gap-3 p-2 pr-6 rounded-lg border transition-all duration-300 min-w-[180px] ${
        isRoot 
          ? "border-transparent bg-transparent" // Root: No background
          : "border-gray-400 bg-gray-300 shadow-sm" // Others: Gray background
      } ${
        isHighlighted ? "ring-2 ring-blue-500 border-blue-500 scale-105" : ""
      }`}
    >
      {/* Profile Image */}
      <div className={`w-10 h-10 rounded-full overflow-hidden border-2 flex-shrink-0 ${isRoot ? "border-indigo-400" : "border-white"}`}>
        <img 
          src={person.image || `https://ui-avatars.com/api/?name=${person.name}&background=6366f1&color=fff`} 
          alt={person.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info Section */}
      <div className="flex flex-col items-start">
        <span className={`text-sm font-bold whitespace-nowrap ${isRoot ? "text-slate-900" : "text-slate-700"}`}>
          {person.name}
        </span>
        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-tighter">
          Level {level}
        </span>
      </div>
    </div>
  </div>
);

const ReferNetwork = ({ data }) => {
  const [selectedUser, setSelectedUser] = useState("");

  // Helper to extract all names for the dropdown
  const getAllUserNames = (node, names = []) => {
    names.push(node.name);
    if (node.referredPersons) {
      node.referredPersons.forEach(child => getAllUserNames(child, names));
    }
    return names;
  };

  const userList = data ? getAllUserNames(data) : [];

  const renderChildren = (node, currentLevel) => {
    if (!node.referredPersons || node.referredPersons.length === 0) return null;

    return node.referredPersons.map((child, index) => (
      <TreeNode
        key={index}
        label={
          <NetworkNode 
            person={child} 
            level={currentLevel + 1} 
            isRoot={false} 
            isHighlighted={selectedUser === child.name}
          />
        }
      >
        {renderChildren(child, currentLevel + 1)}
      </TreeNode>
    ));
  };

  if (!data) return null;

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="px-6 py-4 flex flex-wrap items-center justify-between border-b border-gray-50 bg-slate-50/30">
        <h2 className="text-lg font-bold text-slate-700">Network Chart</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-500">Choose User:</label>
          <div className="relative">
            <select 
              className="text-sm border border-gray-300 rounded-md pl-3 pr-8 py-1.5 bg-white outline-none appearance-none min-w-[160px] shadow-sm cursor-pointer"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Select a user...</option>
              {userList.map((name, i) => (
                <option key={i} value={name}>{name}</option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <Icons icon="heroicons:chevron-down-solid" size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Graph Area */}
      <div className="p-10 overflow-auto bg-[#fafbfc]">
        <div className="min-w-max flex justify-center pb-6">
          <Tree
            lineWidth="1.5px"
            lineColor="#cbd5e1"
            lineBorderRadius="12px"
            label={
              <NetworkNode 
                person={data} 
                level={1} 
                isRoot={true} 
                isHighlighted={selectedUser === data.name}
              />
            }
          >
            {renderChildren(data, 1)}
          </Tree>
        </div>
      </div>
    </div>
  );
};

export default ReferNetwork;