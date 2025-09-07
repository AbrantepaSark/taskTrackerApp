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
  const { tasks, addTask, priorityFilter, setPriorityFilter } = useTasks();
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    priority: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Filter tasks by search term
  // const filteredTasks =
  //   search.trim() === ""
  //     ? tasks
  //     : tasks.filter(
  //         (task) =>
  //           task.title.toLowerCase().includes(search.toLowerCase()) ||
  //           task.description.toLowerCase().includes(search.toLowerCase())
  //       );

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      search.trim() === "" ||
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  const handleModal = () => setIsModalOpen(!isModalOpen);

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
          <SearchBar search={search} setSearch={setSearch} />
        </div>
      </div>
      <div className="p-5 ">
        <Filter setPriorityFilter={setPriorityFilter} />
        <div className="my-5 space-y-5">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task: Task) => (
              <TaskItem key={task.id} data={task} handleModal={handleModal} />
            ))
          ) : (
            <p className="text-gray-500">No tasks found</p>
          )}
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
