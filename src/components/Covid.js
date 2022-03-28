import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const Covid = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const res = await axios({
        method: "GET",
        url: "https://coronavirus-smartable.p.rapidapi.com/stats/v1/MA/",
        headers: {
          "X-RapidAPI-Host": "coronavirus-smartable.p.rapidapi.com",
          "X-RapidAPI-Key":
            "8b8ca184femshbf9446f18bae1ffp1d554fjsn41947901e0ba",
        },
      });
      console.log(res.data.stats);
      setData(res.data.stats);
      setLoading(false);
    };

    fetchData();
  }, []);

  return loading ? (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-2 border-purple-600 rounded-full loader" />
    </div>
  ) : (
    <section className="text-gray-700 body-font">
      <div className="container px-5 py-24 mx-auto animated">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Covid-19 Moroccan Situation
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Follow the latest developments in figures of the Covid-19 disease
            pandemic linked to the new coronavirus live.
          </p>
        </div>
        <div className="flex flex-wrap -m-4 text-center">
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="shadow-lg border-2 border-gray-200 px-4 py-6 rounded-lg">
              <img
                alt=""
                className="w-12 h-12 mb-3 inline-block"
                src="https://cdn.iconscout.com/icon/free/png-64/bones-1721930-1466048.png"
              ></img>
              <h2 className="title-font font-medium text-3xl text-gray-900">
                {data.newlyConfirmedCases}
              </h2>
              <p className="leading-relaxed">New cases</p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="shadow-lg border-2 border-gray-200 px-4 py-6 rounded-lg">
              <img
                className="w-12 h-12 mb-3 inline-block"
                alt=""
                src="https://cdn.iconscout.com/icon/free/png-64/corona-virus-2349959-1956094.png"
              ></img>
              <h2 className="title-font font-medium text-3xl text-gray-900">
                {data.totalConfirmedCases}
              </h2>
              <p className="leading-relaxed">Total Cases</p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="shadow-lg border-2 border-gray-200 px-4 py-6 rounded-lg">
              <img
                alt=""
                className="w-12 h-12 mb-3 inline-block"
                src="https://cdn.iconscout.com/icon/free/png-64/health-insurance-1657882-1406824.png"
              ></img>
              <h2 className="title-font font-medium text-3xl text-gray-900">
                {data.totalRecoveredCases}
              </h2>
              <p className="leading-relaxed">Total Recovered</p>
            </div>
          </div>

          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="shadow-lg border-2 border-gray-200 px-4 py-6 rounded-lg">
              <img
                alt=""
                className="w-12 h-12 mb-3 inline-block"
                src="https://cdn.iconscout.com/icon/free/png-64/funeral-death-gravestone-halloween-rip-grave-3-31643.png"
              ></img>
              <h2 className="title-font font-medium text-3xl text-gray-900">
                {data.totalDeaths}
              </h2>
              <p className="leading-relaxed">Total Deaths</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Covid;
