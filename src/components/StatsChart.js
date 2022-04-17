import React, { useEffect, useState } from "react";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import axios from "axios";
import { getShortNumEn } from "../utils/formatNumber";

const StatsChart = () => {
  const [newCases, setNewCases] = useState([]);
  const [newDeaths, setNewDeaths] = useState([]);

  const getCovidData = () => {
    let endpoints = [
      "https://covid-morocco-api.vercel.app/cases",
      "https://covid-morocco-api.vercel.app/deaths",
    ];

    Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
      ([{ data: cases }, { data: deaths }]) => {
        setNewCases(cases);
        setNewDeaths(deaths);
      }
    );
  };

  useEffect(() => {
    getCovidData();
  }, []);

  return (
    <div className="container mx-auto flex flex-col lg:flex-row animated">
      <div>
        <h1 className=" text-gray-100 text-right">Daily new Covid Cases</h1>
        <LineChart
          width={600}
          height={300}
          data={newCases}
          margin={{ top: 0, right: 20, left: 20, bottom: 10 }}
        >
          <XAxis
            dataKey="date"
            dy={10}
            stroke="#414143"
            tick={{ fontSize: 12, fill: "#fff" }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(value) => {
              return getShortNumEn(value);
            }}
            dx={-10}
            stroke="#414143"
            tick={{ fontSize: 12, fill: "#fff" }}
            tickLine={false}
            tickCount={8}
            domain={[0, "new_cases"]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1d1d22",
              border: false,
              color: "#6b7280",
              fontSize: 14,
            }}
            cursor={false}
          />
          <Line
            dot={false}
            dataKey="new_cases"
            stroke="#39c197"
            strokeWidth={1}
          />
        </LineChart>
      </div>
      <div>
        <h1 className=" text-gray-100 text-right">
          Daily new deaths from covid
        </h1>
        <LineChart
          width={600}
          height={300}
          data={newDeaths}
          margin={{ top: 0, right: 20, left: 20, bottom: 10 }}
        >
          <XAxis
            dataKey="date"
            dy={10}
            stroke="#414143"
            tick={{ fontSize: 12, fill: "#fff" }}
            tickLine={false}
          />
          <YAxis
            dx={-10}
            tickFormatter={(value) => {
              return getShortNumEn(value);
            }}
            stroke="#414143"
            tick={{ fontSize: 12, fill: "#fff" }}
            tickCount={8}
            tickLine={false}
            domain={[0, "new_deaths"]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1d1d22",
              border: false,
              color: "#6b7280",
              fontSize: 14,
            }}
            cursor={false}
          />

          <Line
            dot={false}
            dataKey="new_deaths"
            stroke="#347ff7"
            strokeWidth={1}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default StatsChart;
