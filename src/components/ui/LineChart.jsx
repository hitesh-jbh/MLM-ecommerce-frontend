import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// /**
//  * @param {Array} data - The array of objects to display
//  * @param {string} xKey - The key for the X-axis (e.g., "name" or "month")
//  * @param {string} yKey - The key for the Y-axis (e.g., "value" or "pv")
//  * @param {string} lineColor - Hex or Tailwind color for the line
//  * @param {string} title - Optional title for the chart
//  */
const LineChart = ({ 
    data, 
    xKey = "name", 
    yKey = "value", 
    lineColor = "#4f46e5", 
    title 
}) => {
  return (
    <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-white p-2 md:p-6 rounded-xl border shadow-sm">
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      )}
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          
          <XAxis
            dataKey={xKey}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            dy={10}
          />
          
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />
          
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          
          <Line
            type="monotone"
            dataKey={yKey}
            stroke={lineColor}
            strokeWidth={3}
            dot={{ r: 4, fill: lineColor, strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;

{/* <LineChart 
        data={monthlySales} 
        xKey="month" 
        yKey="total" 
        title="Active Users" 
        lineColor="#f59e0b" // Amber
      /> */}