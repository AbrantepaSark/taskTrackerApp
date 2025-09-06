export interface TaskProps {
  title: string;
  description: string;
  priority: string;
  modalHandler: () => void;
  deleteHandler: () => void;
}

export interface modalProps {
  isOpen: boolean;
  onClose: () => void;
}
