import React, { useState } from "react";
import Card from "./Card";
import { FaHourglassEnd } from "react-icons/fa6";
import { TbCircleDashedCheck, TbUserScan } from "react-icons/tb";
import { FaRegFolder, FaCheckCircle } from "react-icons/fa";
import { IoAlertCircleOutline } from "react-icons/io5";

const DisplayInfo = () => {
  const [metrics, setMetrics] = useState({
    totalFolders: 0,
    aiRecommendation: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
  });

  const metricsData = [
    {
      title: "Specialist Appointments Pending",
      subTitle: "View",
      value: metrics.pendingTasks,
      icon: FaHourglassEnd,
      onClick: () => navigate("/appointments/pending"),
    },
    {
      title: "Treatment Progress Update",
      subTitle: "View",
      value: `${metrics.completedTasks} of ${metrics.totalTasks}`,
      icon: TbCircleDashedCheck,

      onClick: () => navigate("/treatment/progress"),
    },
    {
      title: "Total Folders",
      subTitle: "View",
      value: metrics.totalFolders,
      icon: FaRegFolder,
      onClick: () => navigate("/folders"),
    },
    {
      title: "Total Tasks",
      subTitle: "View",
      value: metrics.totalTasks,
      icon: TbUserScan,
      onClick: () => navigate("/schedule"),
    },
    {
      title: "Completed Tasks",
      subTitle: "View",
      value: metrics.completedTasks,
      icon: FaCheckCircle,
      onClick: () => navigate("/screenings/completed"),
    },
    {
      title: "Pending Tasks",
      subTitle: "View",
      value: metrics.pendingTasks,
      icon: FaHourglassEnd,
      onClick: () => navigate("/screenings/pending"),
    },
    {
      title: "Overdue Tasks",
      subTitle: "View",
      value: metrics.overdueTasks,
      icon: IoAlertCircleOutline,
      onClick: () => navigate("/screenings/overdue"),
    },
  ];

  return (
    <div className="flex flex-wrap gap-[26px]">
      <div className="grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
        {metricsData.slice(0, 2).map((metric) => (
          <Card key={metric.title} {...metric} />
        ))}
      </div>

      <div className="mt-[9px] grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {metricsData.slice(2).map((metric) => (
          <Card key={metric.title} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default DisplayInfo;
