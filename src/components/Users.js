import React, { Component } from "react";
import axios from "axios";
import "../App.css";

class Users extends Component {
  state = {
    global: [],
  };
  componentDidMount() {

    axios({
      "method": "GET",
      "url": "https://covid-19-data.p.rapidapi.com/country",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "5316c7c3fdmsha43e3c3cdf20a3ep15530ajsnd4ad011927a2",
        "useQueryString": true
      }, "params": {
        "format": "json",
        "name": "italy"
      }
    })
      .then((response) => {
        console.log(response.data[0])
        this.setState({
          global: response.data[0]
        });
      })
      .catch((error) => {
        console.log(error)
      })



  }
  render() {
    const { global } = this.state;
    return (
      <div id="wrapper" className="max-w-xl px-4 py-4 mx-auto ">
        <div className="sm:grid sm:h-32 sm:grid-flow-row sm:gap-4 sm:grid-cols-3">
          <div id="jh-stats-positive" className="shadow-lg flex flex-col justify-center px-4 py-4 bg-white border border-gray-300 rounded">
            <div>
              <div>
                <p className="flex items-center justify-end ">
                  <span className="font-bold">
                    <img className="h-8" src="https://cdn.iconscout.com/icon/free/png-64/corona-virus-2349959-1956094.png" ></img>
                  </span>
                </p>
              </div>
              <p className="text-3xl font-semibold text-center text-gray-800">{global.confirmed}</p>
              <p className="text-lg text-center text-gray-500">Total Cases</p>
            </div>
          </div>

          <div id="jh-stats-negative" className="shadow-lg flex flex-col justify-center px-4 py-4 mt-4 bg-white border border-gray-300 rounded sm:mt-0">
            <div>
              <div>
                <p className="flex items-center justify-end">
                  <span className="font-bold">
                    <img className="h-8" src="https://cdn.iconscout.com/icon/free/png-64/health-insurance-1657882-1406824.png" ></img>
                  </span>
                </p>
              </div>
              <p className="text-3xl font-semibold text-center text-gray-800">{global.recovered}</p>
              <p className="text-lg text-center text-gray-500">Total Recovered</p>
            </div>
          </div>

          <div id="jh-stats-neutral" className="shadow-lg flex flex-col justify-center px-4 py-4 mt-4 bg-white border border-gray-300 rounded sm:mt-0">
            <div>
              <div>
                <p className="flex items-center justify-end">
                  <span className="font-bold">
                    <img className="h-8" src="https://cdn.iconscout.com/icon/free/png-64/funeral-death-gravestone-halloween-rip-grave-3-31643.png" ></img>
                  </span>
                </p>
              </div>
              <p className="text-3xl font-semibold text-center text-gray-800">{global.deaths}</p>
              <p className="text-lg text-center text-gray-500">Total Deaths</p>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
export default Users;
