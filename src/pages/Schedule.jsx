import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import KanbanBoard from "../components/KanbanBoard";

const Schedule = () => {
  const { state } = useLocation();
  useEffect(() => {
    document.title = "SteadyPathAI | Schedule";
  }, []);
  return (
    <div className="kanban w-full overflow-auto scrollbar-thin">
      <KanbanBoard state={state} />
    </div>
  );
};

export default Schedule;
