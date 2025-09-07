export interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
}

export interface TaskContextType {
  tasks: Task[];
  addTask: ({ title, description, priority }: Task) => void;
  editTask: ({ title, description, priority }: Task) => void;
  removeTask: (id: string) => void;
  priorityFilter: string;
  setPriorityFilter: (filter: string) => void;
  reorderTasks: (startIndex: number, endIndex: number) => void;
}

export interface taskModalProps {
  data?: Task;
  isOpen: boolean;
  editingTask?: string;
  onClose: () => void;
  inputHandler: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  submitHandler: (e: React.FormEvent) => void;
}
