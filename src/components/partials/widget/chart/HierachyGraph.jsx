import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";

const StyledNode = ({ label }) => (
  <div className="p-2 rounded-lg inline-block border border-gray-900 bg-white shadow-sm min-w-[110px]">
    <div className="text-[10px] md:text-xs font-bold uppercase tracking-tight whitespace-nowrap px-1 text-gray-800">
      {label}
    </div>
  </div>
);

const HierarchyGraph = ({ data }) => {
  // Helper to safely render full names from API
  const getFullName = (person) => {
    if (!person) return "User";
    return `${person.first_name || ""} ${person.last_name || ""}`.trim();
  };

  const renderNodes = (person) => {
    // API uses "children" as the array key
    if (!person.children || !Array.isArray(person.children) || person.children.length === 0) {
      return null;
    }

    return person.children.map((child, index) => (
      <TreeNode
        key={child.id || index}
        label={<StyledNode label={getFullName(child)} />}
      >
        {renderNodes(child)}
      </TreeNode>
    ));
  };

  if (!data) return null;

  return (
    <div className="w-full h-full bg-white overflow-hidden">
      <div className="p-2 overflow-auto max-h-[350px] scrollbar-hide">
        <div className="min-w-max flex justify-center py-4">
          <Tree
            lineWidth={"1.5px"}
            lineColor={"#000"}
            lineBorderRadius={"5px"}
            label={<StyledNode label={getFullName(data)} />}
          >
            {renderNodes(data)}
          </Tree>
        </div>
      </div>
    </div>
  );
};

export default HierarchyGraph;

// import React from "react";
// import { Tree, TreeNode } from "react-organizational-chart";

// const StyledNode = ({ label, isRoot }) => (
//   <div className="p-3 rounded-lg inline-block border-2 shadow-sm min-w-[120px] border-gray-900 ">
//     <div className="text-xs md:text-sm font-semibold whitespace-nowrap px-2">
//       {label}
//     </div>
//   </div>
// );

// const HierarchyGraph = ({ data }) => {
//   const renderNodes = (person) => {
//     if (!person.referredPersons || person.referredPersons.length === 0) {
//       return null;
//     }

//     return person.referredPersons.map((child, index) => (
//       <TreeNode
//         key={child.id || index}
//         label={<StyledNode label={child.name} isRoot={false} />}
//       >
//         {renderNodes(child)}
//       </TreeNode>
//     ));
//   };

//   if (!data) return null;

//   return (
//     <div className="w-full bg-gray-50 rounded-xl border border-gray-200 shadow-inner overflow-hidden">
//       <div className="p-4 md:p-8 overflow-auto max-h-[70vh]">
//         <div className="min-w-max flex justify-center">
//           <Tree
//             lineWidth={"2px"}
//             lineColor={"#9ca3af"}
//             lineBorderRadius={"10px"}
//             label={<StyledNode label={data.name} isRoot={true} />}
//           >
//             {renderNodes(data)}
//           </Tree>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HierarchyGraph;