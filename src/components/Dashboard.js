import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const Dashboard = ({ countryIso: initialCountryIso = "MAR", onCountryChange }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  // countryIso state now reflects the prop passed from App.js
  const [countryIso, setCountryIsoInternal] = useState(initialCountryIso);
  const [inputValue, setInputValue] = useState(initialCountryIso);

  // Update internal state if the prop changes (e.g., when App.js state changes)
  useEffect(() => {
    setCountryIsoInternal(initialCountryIso);
    setInputValue(initialCountryIso);
  }, [initialCountryIso]);

  useEffect(() => {
    // Use the internal countryIso state for fetching data
    if (!countryIso) return; // Do not fetch if countryIso is not set

    const options = {
      method: "GET",
      url: "https://covid-19-statistics.p.rapidapi.com/reports",
      params: {
        iso: countryIso, // Use the internal state
        // date: "2023-02-01", // Removed to fetch the latest data
      },
      headers: {
        "X-RapidAPI-Key": "e9cbc47e7dmshb8c7455b52f358bp1e39c3jsn4365d85d4163",
        "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
      },
    };

    const fetchAPI = async () => {
      setError(null); // Clear previous errors
      try {
        const response = await axios.request(options);
        if (response.data && response.data.length > 0) {
          setData(response.data[0]);
        } else {
          // Handle cases where response.data might be empty or not in expected format
          setData(null);
          setError("Could not fetch data. The country ISO code might be invalid or no data is available.");
        }
      } catch (err) {
        console.error(err);
        setData(null);
        setError("Could not fetch data. Please check the country ISO code or try again later.");
      }
    };
    fetchAPI();
  }, [countryIso]); // Depend on the internal countryIso state

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFetchData = () => {
    const newIso = inputValue.toUpperCase();
    setCountryIsoInternal(newIso); // Update internal state first
    if (onCountryChange) {
      onCountryChange(newIso); // Then call the callback to update App.js state
    }
  };

  return (
    <div className="container mb-12 mx-auto mt-20 animated">
      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter Country ISO (e.g., USA)"
          className="border p-2 mr-2"
        />
        <button onClick={handleFetchData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Fetch Data
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 text-center bg-red-100 text-red-700 border border-red-400 rounded">
          <p>{error}</p>
        </div>
      )}

      {!error && data && (
        <>
          <div className="grid grid-cols-2 gap-4 place-items-center lg:flex lg:justify-around mb-10">
            <div className="card">
              <h2 className="font-bold text-3xl lg:text-4xl orange">
                {Number(data.confirmed).toLocaleString("en")}
              </h2>
              <p className="font-medium text-white">Confirmed</p>
            </div>
            <div className="">
              <h2 className="font-bold text-3xl lg:text-4xl blue">
                {Number(data.deaths).toLocaleString("en")}
              </h2>
              <p className="font-medium text-white">Deaths</p>
            </div>
            <div className="">
              <h2 className="font-bold text-3xl lg:text-4xl green">
                {Number(data.recovered).toLocaleString("en")}
              </h2>
              <p className="font-medium text-white">recovered</p>
            </div>
            <div className="">
              <h2 className="font-bold text-3xl lg:text-4xl red">
                {Number(data.confirmed_diff).toLocaleString("en")}
              </h2>
              <p className="font-medium text-white">Confirmed difference</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 place-items-center lg:flex lg:justify-around ">
            <div className="card">
              <h2 className="font-bold text-3xl lg:text-4xl orange">
                {Number(data.active).toLocaleString("en")}
              </h2>
              <p className="font-medium text-white">Active cases</p>
            </div>
            <div className="">
              <h2 className="font-bold text-3xl lg:text-4xl blue">
                {Number(data.active_diff).toLocaleString("en")}
              </h2>
              <p className="font-medium text-white">Active Difference</p>
            </div>
            <div className="">
              <h2 className="font-bold text-3xl lg:text-4xl green">
                {Number(data.fatality_rate).toLocaleString("en")}
              </h2>
              <p className="font-medium text-white">Fatality Rate</p>
            </div>
            <div className="">
              <h2 className="font-bold text-3xl lg:text-4xl red">
                {data.last_update} 
              </h2>
              <p className="font-medium text-white">Last Update</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
