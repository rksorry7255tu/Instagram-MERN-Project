import React from "react";
import LeftSideBar from "./LeftSideBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="">
      <LeftSideBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
