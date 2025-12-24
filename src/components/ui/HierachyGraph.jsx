import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";

/**
 * Styled Node Component
 * Fixed: logic for conditional classes and removed invalid attributes
 */
const StyledNode = ({ label, isRoot }) => (
  <div className={`p-2 rounded-lg inline-block border-2 shadow-sm min-w-[120px] 
    ${isRoot = "bg-green-700 border-green-800 text-white" }`}>
    <div className="text-sm font-semibold">{label}</div>
  </div>
);

const HierarchyGraph = ({ data }) => {
  // Recursive function to render children
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
    <div className="w-full overflow-x-auto p-8 flex justify-center bg-gray-50 rounded-xl">
      <Tree
        lineWidth={"2px"}
        lineColor={"black"} // Changed to black
        lineBorderRadius={"10px"}
        label={<StyledNode label={data.name} isRoot={true} />}
      >
        {renderNodes(data)}
      </Tree>
    </div>
  );
};

// Example App Component
const App = () => {
  const referralData = {
    id: "root-1",
    name: "Alex",
    referredPersons: [
      {
        id: "p-1",
        name: "John",
        referredPersons: [
          {
            id: "rp-1",
            name: "Sarah",
            referredPersons: [] 
          },
          {
            id: "rp-2",
            name: "Mike",
            referredPersons: [
                {
                    id: "rp-4",
                    name: "Harris",
                    referredPersons: [],
                }
            ] 
          },
          {
            id: "rp-3",
            name: "Mark",
            referredPersons: [
                {
                    id: "rp-5",
                    name: "Ryan",
                    referredPersons: [],
                },
                {
                    id: "rp-6",
                    name: "Sandy",
                    referredPersons: [],
                },
            ] 
          }
        ]
      }
    ]
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Referral Network</h2>
      <HierarchyGraph data={referralData} />
    </div>
  );
};

export default App;