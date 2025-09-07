import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

import type { Task, TaskContextType } from "@/interfaces/interfaces";

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

const STORAGE_KEY = "my-tasks";

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("my-tasks");
    return stored ? JSON.parse(stored) : [];
  });

  const [priorityFilter, setPriorityFilter] = useState("All");

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = ({ title, description, priority }: Task) => {
    setTasks((prev) => [
      ...prev,
      { id: uuidv4(), title, description, priority },
    ]);
  };

  const editTask = ({ id, title, description, priority }: Task) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title, description, priority } : task
      )
    );
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const reorderTasks = (
    startIndex: number,
    endIndex: number,
    visibleTaskIds?: string[]
  ) => {
    setTasks((prev) => {
      // If filtering/searching, reorder using the IDs from visible list
      if (visibleTaskIds) {
        const updated = [...prev];
        const taskId = visibleTaskIds[startIndex];
        const targetId = visibleTaskIds[endIndex];

        // Find the indexes in the full task list
        const sourceIndex = updated.findIndex((t) => t.id === taskId);
        const destinationIndex = updated.findIndex((t) => t.id === targetId);

        const [removed] = updated.splice(sourceIndex, 1);
        updated.splice(destinationIndex, 0, removed);
        return updated;
      }

      // Normal reorder (when no filter applied)
      const updated = [...prev];
      const [removed] = updated.splice(startIndex, 1);
      updated.splice(endIndex, 0, removed);
      return updated;
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        removeTask,
        priorityFilter,
        setPriorityFilter,
        reorderTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used inside TaskProvider");
  }
  return context;
}
