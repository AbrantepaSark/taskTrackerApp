import React from "react";

import type { taskModalProps } from "../interfaces/interfaces";
import type { Task } from "../interfaces/interfaces";
import { useTasks } from "../context/taskContext";

export const EditTaskModal: React.FC<taskModalProps> = ({
  isOpen,
  onClose,
  inputHandler,
  submitHandler,
  editingTask,
}) => {
  const { tasks } = useTasks();

  const task = tasks.find((item: Task) => item.id === editingTask);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4"> Update Task </h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={task?.title}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter task title"
              onChange={(e) => inputHandler(e)}
            />
          </div>

          <div>
            <label
              htmlFor="Description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="message"
              rows={4}
              name="description"
              defaultValue={task?.description}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description"
              onChange={(e) => inputHandler(e)}
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue={task?.priority}
              name="priority"
              onChange={(e) => inputHandler(e)}
            >
              <option value="" disabled>
                Select priority
              </option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={(e) => submitHandler(e)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
