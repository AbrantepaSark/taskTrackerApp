export interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
}

// export interface TaskItemProps {
//   data: Task;
//   modalHandler: () => void;
// }

export interface TaskContextType {
  tasks: Task[];
  addTask: ({ title, description, priority }: Task) => void;
  editTask: ({ title, description, priority }: Task) => void;
  removeTask: (id: string) => void;
}

export interface modalProps {
  data: Task;
  isOpen: boolean;
  onClose: () => void;
  inputHandler: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  submitHandler: (e: React.FormEvent) => void;
}
