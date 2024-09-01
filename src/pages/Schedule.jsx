import React from "react";
import { useLocation } from "react-router-dom";
import KanbanBoard from "../components/KanbanBoard";

const Schedule = () => {
  const { state } = useLocation();

  return (
    <div className="kanban scrollbar-thin w-full overflow-auto">
      <KanbanBoard state={state} />
    </div>
  );
};

export default Schedule;
