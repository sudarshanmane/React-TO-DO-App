import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex flex-col m-auto w-11/12">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AppLayout;
