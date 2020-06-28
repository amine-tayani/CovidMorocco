import React, { Component } from "react";
import axios from "axios";
import "../App.css";

class Users extends Component {
  state = {
    global: [],
    loading: false,
  };
  async componentDidMount() {
    this.setState({ loading: true })
    const res = await axios({
      "method": "GET",
      "url": "https://covid-19-data.p.rapidapi.com/country",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "5316c7c3fdmsha43e3c3cdf20a3ep15530ajsnd4ad011927a2",
        "useQueryString": true
      },
      "params": {
        "format": "json",
        "name": "Morocco"
      }
    })

    this.setState({
      global: res.data[0],
      loading: false
    });
  }
  render() {
    const { global, loading } = this.state;
    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="w-10 h-10 border-2 border-purple-600 rounded-full loader"></div>
        </div>
      )
    }
    return (
      <section className="text-gray-700 body-font ">
        <div className="container px-5 py-24 mx-auto animated ">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Corona Virus Statistics</h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Covid-19 {global.country} Situation</h1>
          </div>
          <div className="flex flex-wrap -m-4 ">
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col shadow-lg">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center text-white flex-shrink-0">
                    <img className="h-8" alt="" src="https://cdn.iconscout.com/icon/free/png-64/corona-virus-2349959-1956094.png" ></img>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">Total Cases</h2>
                </div>
                <div className="flex-grow">
                  <h2 className="text-center title-font font-medium text-3xl text-gray-900">{global.confirmed}</h2>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3 ">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col shadow-lg">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center text-white flex-shrink-0">
                    <img alt="" className="h-8" src="https://cdn.iconscout.com/icon/free/png-64/health-insurance-1657882-1406824.png" ></img>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">Total Recovered</h2>
                </div>
                <div className="flex-grow">
                  <h2 className="text-center title-font font-medium text-3xl text-gray-900">{global.recovered}</h2>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col shadow-lg">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center text-white flex-shrink-0">
                    <img alt="" className="h-8" src="https://cdn.iconscout.com/icon/free/png-64/funeral-death-gravestone-halloween-rip-grave-3-31643.png" ></img>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">Total Deaths</h2>
                </div>
                <div className="flex-grow">
                  <h2 className="text-center title-font font-medium text-3xl text-gray-900">{global.deaths}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Users;
