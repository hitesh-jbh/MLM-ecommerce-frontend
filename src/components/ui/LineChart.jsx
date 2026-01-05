import React, { useState, useEffect } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineChart = ({ 
    data, 
    xKey = "name", 
    yKey = "value", 
    lineColor = "#3b82f6", 
    title 
}) => {
  const [isReady, setIsReady] = useState(false);

  // 1. Fix for Recharts dimension calculation error
  // This ensures the DOM is fully painted before Recharts tries to measure it.
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Show a loading placeholder while the chart "readies" its dimensions
  if (!isReady) {
    return (
      <div className="w-full h-[300px] bg-gray-50 rounded-xl border border-gray-200 animate-pulse flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading Chart...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
      
      {title && (
        <h3 className="text-xl font-black uppercase tracking-tighter mb-6 italic text-gray-900">
          {title}
        </h3>
      )}
      
      {/* 2. Critical Wrapper Fix:
          'relative' provides the bounding box for ResponsiveContainer.
          'min-h-[200px]' ensures the chart never collapses to 0 height. */}
      <div className="relative flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={data}
            margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#f3f4f6" 
            />
            
            <XAxis
              dataKey={xKey}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 500 }}
              dy={10}
            />
            
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              width={60}
            />
            
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              cursor={{ stroke: '#f3f4f6', strokeWidth: 2 }}
            />
            
            <Line
              type="monotone"
              dataKey={yKey}
              stroke={lineColor}
              strokeWidth={3}
              dot={{ r: 4, fill: lineColor, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, strokeWidth: 0, fill: "#111827" }}
              animationDuration={1000}
              // 3. This helps with rendering issues during transitions
              isAnimationActive={true}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;


// import React from "react";
// // Import using an alias to prevent "Identifier already declared" error
// import {
//   LineChart as RechartsLineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// /**
//  * @param {Array} data - Array of objects (e.g., [{ month: "Jan", total: 400 }])
//  * @param {string} xKey - Key for the X-axis (default: "name")
//  * @param {string} yKey - Key for the Y-axis (default: "value")
//  * @param {string} lineColor - Hex or Tailwind color for the line
//  * @param {string} title - Optional heading text
//  */
// const LineChart = ({ 
//     data, 
//     xKey = "name", 
//     yKey = "value", 
//     lineColor = "#000000",
//     title 
// }) => {
//   return (
//     <div className="w-full h-[300px] md:h-[300px] lg:h-[300px] bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
      
      
//       {title && (
//         <h3 className="text-xl font-black uppercase tracking-tighter mb-6 italic text-gray-900">
//           {title}
//         </h3>
//       )}
      
//       <div className="flex-1 min-h-1 w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <RechartsLineChart
//             data={data}
//             /* Positive margins prevent the graph from overlapping other page elements */
//             margin={{ top: 5, right: 20, left: 0, bottom: 20 }}
//           >
//             <CartesianGrid 
//               strokeDasharray="3 3" 
//               vertical={false} 
//               stroke="#f0f0f0" 
//             />
            
//             <XAxis
//               dataKey={xKey}
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 500 }}
//               dy={15} // Adds space between the axis and labels
//             />
            
//             <YAxis
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "#9ca3af", fontSize: 12 }}
//               width={40} // Provides fixed width for numbers to prevent shifting
//             />
            
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "#fff",
//                 borderRadius: "12px",
//                 border: "1px solid #e5e7eb",
//                 boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
//                 padding: "10px"
//               }}
//               itemStyle={{ fontWeight: "bold", color: "#000" }}
//               cursor={{ stroke: '#e5e7eb', strokeWidth: 2 }}
//             />
            
//             <Line
//               type="monotone"
//               dataKey={yKey}
//               stroke={lineColor}
//               strokeWidth={4} // Thicker line for a modern look
//               dot={{ r: 5, fill: lineColor, strokeWidth: 3, stroke: "#fff" }}
//               activeDot={{ r: 8, strokeWidth: 0, fill: "#000" }}
//               animationDuration={1500}
//             />
//           </RechartsLineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default LineChart;