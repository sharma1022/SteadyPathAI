import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import { FaHourglassEnd } from "react-icons/fa6";
import { TbCircleDashedCheck, TbUserScan } from "react-icons/tb";
import { FaRegFolder, FaCheckCircle } from "react-icons/fa";
import { IoAlertCircleOutline } from "react-icons/io5";
import { usePrivy } from "@privy-io/react-auth";
import { useStateContext } from "../context";

const DisplayInfo = () => {
  const navigate = useNavigate();
  const { user } = usePrivy();
  const { getUserRecords, records, getUserByEmail } = useStateContext();
  const [metrics, setMetrics] = useState({
    totalFolders: 0,
    aiRecommendation: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
  });

  useEffect(() => {
    if (user) {
      getUserByEmail(user.email.address)
        .then(() => {
          console.log(records);
          const totalFolders = records.length;
          let aiRecommendation = 0;
          let totalTasks = 0;
          let completedTasks = 0;
          let pendingTasks = 0;
          let overdueTasks = 0;

          records.forEach((record) => {
            if (record.kanbanRecords) {
              try {
                const kanban = JSON.parse(record.kanbanRecords);
                aiRecommendation += kanban.columns.some(
                  (column) => column.title === "AI Personalized Treatment",
                )
                  ? 1
                  : 0;
                totalTasks += kanban.tasks.length;
                completedTasks += kanban.tasks.filter(
                  (task) => task.columnId === "done",
                ).length;
                console.log(kanban.tasks);
                pendingTasks += kanban.tasks.filter(
                  (task) => task.columnId === "doing",
                ).length;
                overdueTasks += kanban.tasks.filter(
                  (task) => task.columnId === "overdue",
                ).length;
              } catch (error) {
                console.error("Failed to parse kanbanRecords:", error);
              }
            }
          });

          setMetrics({
            totalFolders,
            aiRecommendation,
            totalTasks,
            completedTasks,
            pendingTasks,
            overdueTasks,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user, getUserRecords, records]);

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
      onClick: () => navigate("/task/completed"),
    },
    {
      title: "Pending Tasks",
      subTitle: "View",
      value: metrics.pendingTasks,
      icon: FaHourglassEnd,
      onClick: () => navigate("/task/pending"),
    },
    {
      title: "Overdue Tasks",
      subTitle: "View",
      value: metrics.overdueTasks,
      icon: IoAlertCircleOutline,
      onClick: () => navigate("/task/overdue"),
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
