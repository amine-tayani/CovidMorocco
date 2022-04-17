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

  return (
    <div className="container mb-12 mx-auto mt-20 animated">
      <div className="grid grid-cols-2 gap-4 place-items-center lg:flex lg:justify-around mb-10">
        <div className="card">
          <h2 className="font-bold text-3xl lg:text-4xl orange">
            {Number(data?.todayCases).toLocaleString("en")}
          </h2>
          <p className="font-medium text-white">New cases</p>
        </div>
        <div className="">
          <h2 className="font-bold text-3xl lg:text-4xl blue">
            {Number(data?.cases).toLocaleString("en")}
          </h2>
          <p className="font-medium text-white">Total Cases</p>
        </div>
        <div className="">
          <h2 className="font-bold text-3xl lg:text-4xl green">
            {Number(data?.recovered).toLocaleString("en")}
          </h2>
          <p className="font-medium text-white">Total Recovered</p>
        </div>

        <div className="">
          <h2 className="font-bold text-3xl lg:text-4xl red">
            {Number(data?.deaths).toLocaleString("en")}
          </h2>
          <p className="font-medium text-white">Total Deaths</p>
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
            {Number(data?.population).toLocaleString("en")}
          </h2>
          <p className="font-medium text-white">Population</p>
        </div>
        <div className="">
          <h2 className="font-bold text-3xl lg:text-4xl green">
            {Number(data?.tests).toLocaleString("en")}
          </h2>
          <p className="font-medium text-white">Total Tests</p>
        </div>

        <div className="">
          <h2 className="font-bold text-3xl lg:text-4xl red">
            {Number(data?.critical).toLocaleString("en")}
          </h2>
          <p className="font-medium text-white">Critical Cases</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
