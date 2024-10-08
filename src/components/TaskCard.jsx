import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaRegTrashAlt } from "react-icons/fa";
const TaskCard = ({ task, deleteTask, updateTask }) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="dark:bg-mainBackgroundColor relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl border-2 border-green-500 bg-gray-100 p-3 text-left opacity-30"
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-mainBackgroundColor relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-blue-500"
      >
        <textarea
          className="h-[90%] w-full resize-none rounded border-none bg-transparent text-gray-800 focus:outline-none dark:text-white"
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="task relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl bg-gray-100 p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-blue-500 dark:bg-[#13131a]"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap text-gray-800 dark:text-white">
        {task.content}
      </p>

      {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(task.id);
          }}
          className="bg-columnBackgroundColor absolute right-4 top-1/2 -translate-y-1/2 rounded stroke-white p-2 opacity-60 hover:opacity-100"
        >
          <FaRegTrashAlt className="text-gray-800 hover:text-red-600 dark:text-white" />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
