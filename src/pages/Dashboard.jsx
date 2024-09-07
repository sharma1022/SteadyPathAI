import React, { useEffect } from "react";
import DisplayInfo from "../components/DisplayInfo";

const Dashboard = () => {
  useEffect(() => {
    document.title = "SteadyPathAI | Dashboard";
  }, []);
  return <DisplayInfo />;
};

export default Dashboard;
