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

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, removeTask }}>
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
