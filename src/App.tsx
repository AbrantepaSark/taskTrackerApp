import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./App.css";
import { SearchBar } from "./components/search";
import { Filter } from "./components/filter";
import { TaskItem } from "./components/taskItem";
import { AddTaskModal } from "./components/addTaskModal";
//import { EditTaskModal } from "./components/editTaskModal";
import { MdAdd } from "react-icons/md";
import { useTasks } from "./context/taskContext";
//import type { Task } from "./interfaces/interfaces";

function App() {
  const { tasks, addTask, priorityFilter, setPriorityFilter, reorderTasks } =
    useTasks();
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    priority: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

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

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderTasks(result.source.index, result.destination.index);
  };

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

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="task-list">
            {(provided) => (
              <div
                className="space-y-5 mt-5"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={` ${
                            snapshot.isDragging ? "shadow-lg" : ""
                          }`}
                        >
                          <TaskItem
                            key={task.id}
                            data={task}
                            handleModal={handleModal}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <p className="text-gray-500">No tasks found</p>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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
