import { render, screen, fireEvent } from "@testing-library/react";
import { TaskItem } from "./taskItem";
import { useTasks } from "../context/taskContext";
import type { Task } from "@/interfaces/interfaces";
import type { Mock } from "vitest";
import { vi } from "vitest";

vi.mock("../context/taskContext");

const mockRemoveTask = vi.fn();
(useTasks as unknown as Mock).mockReturnValue({ removeTask: mockRemoveTask });

describe("TaskItem", () => {
  const mockTask: Task = {
    id: "1",
    title: "Test Task",
    description: "This is a test description",
    priority: "High",
  };

  const mockHandleEditTaskModal = vi.fn();
  const mockSetEditingTask = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders task data correctly", () => {
    render(
      <TaskItem
        data={mockTask}
        handleEditTaskModal={mockHandleEditTaskModal}
        setEditingTask={mockSetEditingTask}
      />
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("This is a test description")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
  });

  it("calls setEditingTask and handleEditTaskModal on Edit click", () => {
    render(
      <TaskItem
        data={mockTask}
        handleEditTaskModal={mockHandleEditTaskModal}
        setEditingTask={mockSetEditingTask}
      />
    );

    fireEvent.click(screen.getByText("Edit"));

    expect(mockSetEditingTask).toHaveBeenCalledWith("1");
    expect(mockHandleEditTaskModal).toHaveBeenCalled();
  });

  it("calls removeTask on Delete click", () => {
    render(
      <TaskItem
        data={mockTask}
        handleEditTaskModal={mockHandleEditTaskModal}
        setEditingTask={mockSetEditingTask}
      />
    );

    fireEvent.click(screen.getByText("Delete"));

    expect(mockRemoveTask).toHaveBeenCalledWith("1");
  });
});
