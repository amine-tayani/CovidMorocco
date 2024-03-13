import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const Dashboard = () => {
  const [data, setData] = useState(null);

  const options = {
    method: "GET",
    url: "https://covid-19-statistics.p.rapidapi.com/reports",
    params: {
      iso: "MAR",
      date: "2023-02-01",
    },
    headers: {
      "X-RapidAPI-Key": "e9cbc47e7dmshb8c7455b52f358bp1e39c3jsn4365d85d4163",
      "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await axios.request(options);
        setData(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAPI();
  }, []);

  return (
    <div className="container mb-12 mx-auto mt-20 animated">
      <div className="grid grid-cols-2 gap-4 place-items-center lg:flex lg:justify-around mb-10">
        <div className="card">
          <h2 className="font-bold text-3xl lg:text-4xl orange">
            {Number(data?.confirmed).toLocaleString("en")}
          </h2>
          <p className="font-medium text-white">Confirmed</p>
        </div>
        <div className="">
          <h2 className="font-bold text-3xl lg:text-4xl blue">
            {Number(data?.deaths).toLocaleString("en")}
          </h2>
          <p className="font-medium text-white">Deaths</p>
        </div>
        <div className="">
          <h2 className="font-bold text-3xl lg:text-4xl green">
            {Number(data?.recovered).toLocaleString("en")}
          </h2>
          <p className="font-medium text-white">recovered</p>
        </div>

        <div className="">
          <h2 className="font-bold text-3xl lg:text-4xl red">
            {Number(data?.confirmed_diff).toLocaleString("en")}
          </h2>
          <p className="font-medium text-white">Confirmed difference</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 place-items-center lg:flex lg:justify-around ">
        <div className="card">
          <h2 className="font-bold text-3xl lg:text-4xl orange">
            {Number(data?.active).toLocaleString("en")}
          </h2>
          <p className="font-medium text-white">Active cases</p>
        </div>
        <div className="">
          <h2 className="font-bold text-3xl lg:text-4xl blue">
            {Number(data?.active_diff).toLocaleString("en")}
          </h2>
          <p className="font-medium text-white">Active Difference</p>
        </div>
        <div className="">
          <h2 className="font-bold text-3xl lg:text-4xl green">
            {Number(data?.fatality_rate).toLocaleString("en")}
          </h2>
          <p className="font-medium text-white">Fatality Rate</p>
        </div>

        <div className="">
          <h2 className="font-bold text-3xl lg:text-4xl red">
            {Number(data?.last_update).toLocaleString("en")}
          </h2>
          <p className="font-medium text-white">last_update</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
