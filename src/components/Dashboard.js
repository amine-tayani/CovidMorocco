import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await axios({
        method: "GET",
        url: "https://disease.sh/v3/covid-19/countries/morocco",
      });
      setData(res.data);
    };

    fetchAPI();
  }, []);

  console.log(data);

  return (
    <div className="container mb-12 mx-auto mt-10">
      <div className="grid grid-cols-2 gap-4 place-items-center lg:flex lg:justify-around mb-10">
        <div className="card">
          <h2 className="font-bold text-3xl lg:text-5xl text-orange-500">
            {Number(data?.todayCases).toLocaleString("en")}
          </h2>
          <p className="font-medium text-gray-500 text-lg">New cases</p>
        </div>
        <div className="">
          <h2 className="font-bold text-3xl lg:text-5xl text-purple-500">
            {Number(data?.cases).toLocaleString("en")}
          </h2>
          <p className="font-medium text-gray-500 text-lg">Total Cases</p>
        </div>
        <div className="">
          <h2 className="font-bold text-3xl lg:text-5xl text-green-500">
            {Number(data?.recovered).toLocaleString("en")}
          </h2>
          <p className="font-medium text-gray-500 text-lg">Total Recovered</p>
        </div>

        <div className="">
          <h2 className="font-bold text-3xl lg:text-5xl text-red-500">
            {Number(data?.deaths).toLocaleString("en")}
          </h2>
          <p className="font-medium text-gray-500 text-lg">Total Deaths</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 place-items-center lg:flex lg:justify-around ">
        <div className="card">
          <h2 className="font-bold text-3xl lg:text-5xl text-orange-500">
            {Number(data?.active).toLocaleString("en")}
          </h2>
          <p className="font-medium text-gray-500 text-lg">Active cases</p>
        </div>
        <div className="">
          <h2 className="font-bold text-3xl lg:text-5xl text-purple-500">
            {Number(data?.population).toLocaleString("en")}
          </h2>
          <p className="font-medium text-gray-500 text-lg">Population</p>
        </div>
        <div className="">
          <h2 className="font-bold text-3xl lg:text-5xl text-green-500">
            {Number(data?.tests).toLocaleString("en")}
          </h2>
          <p className="font-medium text-gray-500 text-lg">Total Tests</p>
        </div>

        <div className="">
          <h2 className="font-bold text-3xl lg:text-5xl text-red-500">
            {Number(data?.critical).toLocaleString("en")}
          </h2>
          <p className="font-medium text-gray-500 text-lg">Critical Cases</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
