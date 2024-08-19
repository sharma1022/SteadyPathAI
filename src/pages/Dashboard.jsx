import React from "react";
import Sidebar from "../components/Sidebar";
import DisplayInfo from "../components/DisplayInfo";

const Dashboard = () => {
  return (
    <div className="flex flex-row items-start gap-6">
      <Sidebar />
      <DisplayInfo />
    </div>
  );
};

export default Dashboard;
