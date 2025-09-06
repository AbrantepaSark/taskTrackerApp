//import React from "react";

//import type { TaskItemProps } from "../interfaces/interfaces";
import type { Task } from "@/interfaces/interfaces";
import { useTasks } from "../context/taskContext";

export const TaskItem = ({
  data,
  handleModal,
}: {
  data: Task;
  handleModal: () => void;
}) => {
  const { removeTask } = useTasks();
  return (
    <div className="max-w-sm px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {data.title}
        </h5>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-2 rounded-full ">
          {data.priority}
        </span>
      </div>
      <p className="my-5 font-normal   text-gray-700 dark:text-gray-400">
        {data.description}
      </p>
      <div className="flex justify-end space-x-3 font-semibold">
        <p onClick={() => handleModal()} className="text-blue-600">
          Edit
        </p>
        <p onClick={() => removeTask()} className="text-red-600">
          Delete
        </p>
      </div>
    </div>
  );
};
