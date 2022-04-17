import React from "react";
import Dashboard from "./components/Dashboard";
import StatsChart from "./components/StatsChart";
import "./App.css";

const App = () => {
  return (
    <div className="App ">
      <Dashboard />
      <StatsChart />
    </div>
  );
};

export default App;
