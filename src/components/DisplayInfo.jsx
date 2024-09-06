import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import { FaHourglassEnd } from "react-icons/fa6";
import { TbCircleDashedCheck, TbUserScan } from "react-icons/tb";
import { FaRegFolder, FaCheckCircle, FaTasks } from "react-icons/fa";
import { IoAlertCircleOutline } from "react-icons/io5";
import { usePrivy } from "@privy-io/react-auth";
import { useStateContext } from "../context";
import { InfinitySpin } from "react-loader-spinner";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DisplayInfo = () => {
  const navigate = useNavigate();
  const { user } = usePrivy();
  const {
    getUserRecords,
    records,
    getUserByEmail,
    currentUser,
    setCurrentUser,
  } = useStateContext();
  const [metrics, setMetrics] = useState({
    totalFolders: 0,
    aiRecommendation: 0,
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    toDoTasks: 0,
  });

  useEffect(() => {
    getUserByEmail(user?.email?.address);
  }, []);

  useEffect(() => {
    if (user) {
      getUserByEmail(user?.email?.address)
        .then(() => {
          console.log(records);
          const totalFolders = records.length;
          let aiRecommendation = 0;
          let totalTasks = 0;
          let completedTasks = 0;
          let inProgressTasks = 0;
          let toDoTasks = 0;

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
                inProgressTasks += kanban.tasks.filter(
                  (task) => task.columnId === "doing",
                ).length;
                toDoTasks += kanban.tasks.filter(
                  (task) => task.columnId === "todo",
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
            inProgressTasks,
            toDoTasks,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user, getUserRecords, records]);

  const metricsData = [
    {
      title: "Treatment Progress Update",
      subTitle: "View",
      value: `${metrics.completedTasks} of ${metrics.totalTasks}`,
      icon: TbCircleDashedCheck,

      onClick: () => navigate("/schedule"),
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
      icon: FaTasks,
      onClick: () => navigate("/schedule"),
    },
    {
      title: "Completed Tasks",
      subTitle: "View",
      value: metrics.completedTasks,
      icon: FaCheckCircle,
      onClick: () => navigate("/schedule"),
    },
    {
      title: "Pending Tasks",
      subTitle: "View",
      value: metrics.inProgressTasks,
      icon: FaHourglassEnd,
      onClick: () => navigate("/schedule"),
    },
    {
      title: "To Do Tasks",
      subTitle: "View",
      value: metrics.toDoTasks,
      icon: IoAlertCircleOutline,
      onClick: () => navigate("/schedule"),
    },
  ];

  const DoughnutData = [
    metrics.completedTasks || 0,
    metrics.inProgressTasks || 1,
    metrics.toDoTasks || 0,
  ];
  const DoughnutLabels = ["Completed", "Pending", "Overdue"];

  const data = {
    datasets: [
      {
        label: "Tasks",
        data: DoughnutData,
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
      },
    ],
    hoverOffset: 4,
    labels: DoughnutLabels,
  };
  if (!currentUser) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="text-lg text-gray-500">
          <InfinitySpin
            visible={true}
            width="200"
            color="#2196F3"
            ariaLabel="infinity-spin-loading"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-[26px]">
      <h1 className="navbar-txt text-gray-800 dark:text-white">
        Hi <span className="blue_gradient">{currentUser.firstName}</span>!
      </h1>
      <div className="grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
        {metricsData.slice(0, 1).map((metric) => (
          <>
            <div className="flex w-full flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-800 dark:bg-[#13131a]">
              <div className="flex h-32 justify-center gap-x-3 p-4 md:p-5">
                <Doughnut
                  data={data}
                  options={{
                    cutout: "70%",
                    borderWidth: 0,
                    plugins: {
                      legend: {
                        display: false,
                        position: "left",
                        maxWidth: 108,
                      },
                    },
                  }}
                />
              </div>
            </div>
            <Card key={metric.title} {...metric} />
          </>
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
