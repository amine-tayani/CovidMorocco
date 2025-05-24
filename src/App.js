import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import StatsChart from "./components/StatsChart";
import "./App.css";

const App = () => {
  const [selectedCountryIso, setSelectedCountryIso] = useState("MAR");

  const handleCountryChange = (newCountryIso) => {
    setSelectedCountryIso(newCountryIso);
  };

  return (
    <div className="App ">
      <Dashboard
        countryIso={selectedCountryIso}
        onCountryChange={handleCountryChange}
      />
      <StatsChart countryIso={selectedCountryIso} />
    </div>
  );
};

export default App;
