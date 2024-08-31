import React from "react";
import { useLocation } from "react-router-dom";
import KanbanBoard from "../components/KanbanBoard";
import Sidebar from "../components/Sidebar";

const Schedule = () => {
  const { state } = useLocation();

  return (
    <div className="flex flex-row items-start gap-6">
      <Sidebar />
      <div className="kanban scrollbar-thin w-full overflow-auto">
        <KanbanBoard state={state} />
      </div>
    </div>
  );
};

export default Schedule;
