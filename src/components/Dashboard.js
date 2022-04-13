import React from "react";
import "../App.css";

const Dashboard = ({ loading }) => {
  return loading ? (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-2 border-purple-600 rounded-full loader" />
    </div>
  ) : (
    <div className="container mb-12 mx-auto mt-20">
      <h1 className="text-4xl font-medium text-white mb-20">
        Coronavirus Updates in Morocco
      </h1>
      <div className="grid grid-cols-2 gap-4 place-items-center lg:flex lg:justify-evenly ">
        <div className="card">
          <h2 className="font-bold text-3xl lg:text-5xl text-orange-500">83</h2>
          <p className="font-medium text-gray-500 text-lg">New cases</p>
        </div>
        <div className="">
          <h2 className="font-bold text-3xl lg:text-5xl text-purple-500">
            1,164,135
          </h2>
          <p className="font-medium text-gray-500 text-lg">Total Cases</p>
        </div>
        <div className="">
          <h2 className="font-bold text-3xl lg:text-5xl text-green-500">
            1,147,355
          </h2>
          <p className="font-medium text-gray-500 text-lg">Total Recovered</p>
        </div>

        <div className="">
          <h2 className="font-bold text-3xl lg:text-5xl text-red-500">
            16,061{" "}
          </h2>
          <p className="font-medium text-gray-500 text-lg">Total Deaths</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
