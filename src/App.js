import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard";
import StatsChart from "./components/StatsChart";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const res = await axios({
        method: "GET",
        url: "https://coronavirus-smartable.p.rapidapi.com/stats/v1/MA/",
        headers: {
          "X-RapidAPI-Host": "coronavirus-smartable.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.REACT_APP_RapidAPI_APIKey,
        },
      });
      setHistory(res.data.stats.history);
      setLoading(false);
    };

    fetchData();
  }, []);
  return (
    <div className="App ">
      <Dashboard loading={loading} />
      <StatsChart history={history} />
    </div>
  );
};

export default App;
