import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";

const StyledNode = ({ label, isRoot }) => (
  <div className="p-3 rounded-lg inline-block border-2 shadow-sm min-w-[120px] border-gray-900 ">
    <div className="text-xs md:text-sm font-semibold whitespace-nowrap px-2">
      {label}
    </div>
  </div>
);

const HierarchyGraph = ({ data }) => {
  const renderNodes = (person) => {
    if (!person.referredPersons || person.referredPersons.length === 0) {
      return null;
    }

    return person.referredPersons.map((child, index) => (
      <TreeNode
        key={child.id || index}
        label={<StyledNode label={child.name} isRoot={false} />}
      >
        {renderNodes(child)}
      </TreeNode>
    ));
  };

  if (!data) return null;

  return (
    <div className="w-full bg-gray-50 rounded-xl border border-gray-200 shadow-inner overflow-hidden">
      <div className="p-4 md:p-8 overflow-auto max-h-[70vh]">
        <div className="min-w-max flex justify-center">
          <Tree
            lineWidth={"2px"}
            lineColor={"#9ca3af"}
            lineBorderRadius={"10px"}
            label={<StyledNode label={data.name} isRoot={true} />}
          >
            {renderNodes(data)}
          </Tree>
        </div>
      </div>
    </div>
  );
};

export default HierarchyGraph;