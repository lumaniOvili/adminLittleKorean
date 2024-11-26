"use client";

import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { fetchTrafficStats } from "@/utils/apiService";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
  Legend,
} from "recharts";

export const ActivityGraph = () => {
  const [trafficData, setTrafficData] = useState([]); // State to hold the data fetched from the API
  const [isLoading, setIsLoading] = useState(true); // Loading state to manage the loading indicator

  useEffect(() => {
    const getTrafficStats = async () => {
      try {
        const data = await fetchTrafficStats(); // Fetch the data from the API
        setTrafficData(data); // Set the fetched data to the state
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching traffic stats:", error);
        setIsLoading(false); // Stop loading even if there's an error
      }
    };

    getTrafficStats(); // Call the function to fetch data when the component mounts
  }, []); // Empty dependency array ensures it runs only once on component mount

  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  return (
    <div className="col-span-12 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiUser /> Website Traffic & Order Stats
        </h3>
      </div>

      <div className="h-72 px-4"> {/* Adjust height */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trafficData} // Use the fetched traffic data
            margin={{
              top: 10, // Add some margin at the top
              right: 10, // Add some margin at the right
              left: 10, // Add some margin at the left
              bottom: 10, // Add some margin at the bottom
            }}
          >
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-xs font-bold"
              padding={{ left: 20, right: 20 }} // Add padding to avoid cutting
            />
            <YAxis
              className="text-xs font-bold"
              axisLine={false}
              tickLine={false}
              padding={{ top: 20, bottom: 20 }} // Add padding for the lines
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-stone-500"
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="New"
              stroke="#18181b"
              fill="#18181b"
              strokeWidth={2} // Make the line bolder
            />
            <Line
              type="monotone"
              dataKey="Returning"
              stroke="#5b21b6"
              fill="#5b21b6"
              strokeWidth={2} // Make the line bolder
            />
            <Line
              type="monotone"
              dataKey="Orders"
              stroke="#1d4ed8"
              fill="#1d4ed8"
              strokeWidth={2} // Make the line bolder
            />
            <Line
              type="monotone"
              dataKey="Traffic"
              stroke="#ef4444"
              fill="#ef4444"
              strokeWidth={2} // Make the line bolder
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
