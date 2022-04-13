import React from "react";
import { Area, AreaChart, Tooltip, YAxis } from "recharts";
import { getShortNumEn } from "../utils/formatNumber";

const StatsChart = ({ history }) => {
  const recentStats = history.slice(200);
  return (
    <div className="container mx-auto flex flex-col lg:flex-row">
      <div>
        <h1 className=" text-gray-500 text-right">Total Cases</h1>
        <AreaChart
          width={600}
          height={300}
          data={recentStats}
          margin={{ top: 0, right: 20, left: 20, bottom: 10 }}
        >
          <YAxis
            tickFormatter={(value) => {
              return getShortNumEn(value);
            }}
            stroke="#6b7280"
            tick={{ fontSize: 14 }}
            tickLine={false}
            tickCount={8}
            domain={[0, "confirmed"]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#191930",
              border: false,
              color: "#6b7280",
            }}
            cursor={false}
          />
          <Area
            type="monotone"
            dot={false}
            dataKey="confirmed"
            stroke="#fbbf24"
            fill="#5f4c2a"
            strokeWidth={2}
            fillOpacity={1}
          />
        </AreaChart>
      </div>
      <div>
        <h1 className=" text-gray-500 text-right">
          Total recovered from covid
        </h1>
        <AreaChart
          width={600}
          height={300}
          data={recentStats}
          margin={{ top: 0, right: 20, left: 20, bottom: 10 }}
        >
          <YAxis
            tickFormatter={(value) => {
              return getShortNumEn(value);
            }}
            stroke="#6b7280"
            tick={{ fontSize: 14 }}
            tickCount={8}
            tickLine={false}
            domain={[0, "recovered"]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#191930",
              border: false,
              color: "#6b7280",
            }}
            cursor={false}
          />

          <Area
            dot={false}
            dataKey="recovered"
            fillOpacity={1}
            fill="#137085"
            stroke="#06b6d4"
            strokeWidth={2}
          />
        </AreaChart>
      </div>
    </div>
  );
};

export default StatsChart;
