import { useState } from "react";
import "./App.css";
import { SearchBar } from "./components/search";
import { Filter } from "./components/filter";
import { TaskItem } from "./components/taskItem";
import { AddTaskModal } from "./components/addTaskModal";
//import { EditTaskModal } from "./components/editTaskModal";
import { MdAdd } from "react-icons/md";
import { useTasks } from "./context/taskContext";
import type { Task } from "./interfaces/interfaces";

function App() {
  const { tasks, addTask } = useTasks();
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    priority: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => setIsModalOpen(!isModalOpen);

  // useEffect(() => {
  //   setFormData(task); // sync if different task opened
  // }, [task]);

  // Handle change for all inputs/selects
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(formData);
    setFormData({ id: "", title: "", description: "", priority: "" });
    handleModal();
  };

  // const handleUpdate = (e: React.FormEvent, task: Task) => {
  //   e.preventDefault();
  //   editTask(task);
  //   setFormData({ id: "", title: "", description: "", priority: "" });
  //   handleModal();
  // };

  return (
    <div className="h-full w-full">
      <div className=" h-40 w-full flex px-5  items-center bg-blue-900 text-white">
        <div className=" w-full space-y-6">
          <div className="flex justify-between">
            <p className="text-2xl font-bold"> Task Tracker </p>
            <MdAdd onClick={() => handleModal()} className="h-10 w-10" />
          </div>
          <SearchBar />
        </div>
      </div>
      <div className="p-5 ">
        <Filter />
        <div className="my-5 space-y-5">
          {tasks.map((task: Task) => (
            <TaskItem key={task.id} data={task} handleModal={handleModal} />
          ))}
        </div>
      </div>
      <AddTaskModal
        submitHandler={handleSubmit}
        data={formData}
        inputHandler={handleChange}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App;

// <EditTaskModal
//   submitHandler={handleUpdate}
//   data={formData}
//   inputHandler={handleChange}
//   isOpen={isModalOpen}
//   onClose={() => setIsModalOpen(false)}
// />
