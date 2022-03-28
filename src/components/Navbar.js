import React from "react";
import "../App.css";

const NavBar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-indigo-900 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold  text-xl tracking-tight">
            Covid 19 Morocco
          </span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow"></div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
