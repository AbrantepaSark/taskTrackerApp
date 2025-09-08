import { render, screen, fireEvent } from "@testing-library/react";
import { Filter } from "./filter";
import { vi } from "vitest";

describe("Filter", () => {
  const mockSetPriorityFilter = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders button and hides dropdown by default", () => {
    render(<Filter setPriorityFilter={mockSetPriorityFilter} />);

    expect(screen.getByText("Filter ▾")).toBeInTheDocument();
    expect(screen.queryByText("All")).not.toBeInTheDocument();
  });

  it("opens dropdown when button is clicked", () => {
    render(<Filter setPriorityFilter={mockSetPriorityFilter} />);

    fireEvent.click(screen.getByText("Filter ▾"));

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Low")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
  });

  it("calls setPriorityFilter and closes dropdown when option clicked", () => {
    render(<Filter setPriorityFilter={mockSetPriorityFilter} />);

    fireEvent.click(screen.getByText("Filter ▾"));
    fireEvent.click(screen.getByText("High"));

    expect(mockSetPriorityFilter).toHaveBeenCalledWith("High");
    expect(screen.queryByText("All")).not.toBeInTheDocument();
  });
});
