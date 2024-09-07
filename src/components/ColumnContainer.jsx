import React, { useMemo, useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
const ColumnContainer = ({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}) => {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border-2 border-pink-500 bg-[#1c1c24] opacity-40"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-xl bg-white shadow-lg dark:border-neutral-800 dark:bg-[#1c1c24]"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="text-md m-2 flex h-[60px] cursor-grab items-center justify-between rounded-xl bg-gray-100 p-3 font-bold dark:bg-[#13131a]"
      >
        <div className="flex gap-2 text-gray-800 dark:text-white">
          {!editMode && column.title}
          {editMode && (
            <input
              className="rounded border px-2 outline-none focus:border-blue-500 dark:bg-black"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="hover:bg-columnBackgroundColor rounded stroke-gray-500 px-1 py-2 hover:stroke-white"
        >
          <FaRegTrashAlt className="text-gray-800 hover:text-red-600 dark:text-white" />
        </button>
      </div>

      <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>

      <button
        className="dark:border-columnBackgroundColor dark:border-x-columnBackgroundColor hover:bg-mainBackgroundColor flex items-center gap-2 rounded-md border-2 border-gray-800 p-4 text-gray-800 hover:text-cyan-600 active:bg-black dark:border-gray-300 dark:text-white"
        onClick={() => {
          createTask(column.id);
        }}
      >
        <FaPlus />
        Add task
      </button>
    </div>
  );
};

export default ColumnContainer;
