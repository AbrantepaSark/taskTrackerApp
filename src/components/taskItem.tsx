import type { Task } from "@/interfaces/interfaces";
import { useTasks } from "../context/taskContext";

export const TaskItem = ({
  data,
  handleEditTaskModal,
  setEditingTask,
}: {
  data: Task;
  handleEditTaskModal: () => void;
  setEditingTask: (id: string) => void;
}) => {
  const { removeTask } = useTasks();
  return (
    <div className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
          {data.title}
        </h5>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-2 rounded-full ">
          {data.priority}
        </span>
      </div>
      <p className="my-3 font-normal   text-gray-700 dark:text-gray-400">
        {data.description}
      </p>
      <div className="flex justify-end space-x-3 font-semibold">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditingTask(data.id);
            handleEditTaskModal();
          }}
          className=" py-1 text-sm text-blue-600 "
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeTask(data.id);
          }}
          className="px-3 text-sm py-1 text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
