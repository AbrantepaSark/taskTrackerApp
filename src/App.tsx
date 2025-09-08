import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { SearchBar } from "./components/search";
import { Filter } from "./components/filter";
import { TaskItem } from "./components/taskItem";
import { AddTaskModal } from "./components/addTaskModal";
import { EditTaskModal } from "./components/editTaskModal";
import { MdAdd } from "react-icons/md";
import { useTasks } from "./context/taskContext";
import type { Task } from "./interfaces/interfaces";

function App() {
  const {
    tasks,
    addTask,
    editTask,
    priorityFilter,
    setPriorityFilter,
    reorderTasks,
  } = useTasks();
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    priority: "",
  });

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<string>("");
  const [search, setSearch] = useState("");

  //Filter task
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      search.trim() === "" ||
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  //Toggle add task form modal
  const handleAddTaskModal = () => setIsAddTaskModalOpen(!isAddTaskModalOpen);
  //Toggle edit task form modal
  const handleEditTaskModal = () =>
    setIsEditTaskModalOpen(!isEditTaskModalOpen);

  // Handle change for all inputs/selects
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //Task submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.priority) return;
    addTask(formData);
    setFormData({ id: "", title: "", description: "", priority: "" });
    handleAddTaskModal();
  };

  //Task update handler
  const handleTaskUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToPass: Task = { ...formData };
    const task = tasks.find((item: Task) => item.id === editingTask);

    if (!task) return;
    if (dataToPass.title == "") dataToPass.title = task.title;

    if (dataToPass.description == "") dataToPass.description = task.description;

    if (dataToPass.priority == "") dataToPass.priority = task.priority;

    editTask({ ...dataToPass, id: task.id });
    setEditingTask("");
    setFormData({ id: "", title: "", description: "", priority: "" });
    handleEditTaskModal();
  };

  //Handle draggable
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderTasks(result.source.index, result.destination.index);
  };

  return (
    <div className="h-full w-full items-center ">
      <div className=" h-40 w-full   flex px-5 md:px-10 lg:px-50 xl:px-80 items-center bg-blue-900 text-white">
        <div className=" w-full mx-auto  space-y-4">
          <div className="flex justify-between">
            <p className="text-2xl font-bold"> Task Tracker </p>
            <MdAdd onClick={handleAddTaskModal} className="h-10 w-10" />
          </div>
          <SearchBar search={search} setSearch={setSearch} />
        </div>
      </div>
      <div className="p-5 md:px-10 lg:px-50 xl:px-80 ">
        <Filter setPriorityFilter={setPriorityFilter} />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="task-list">
            {(provided) => (
              <div
                className=" mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2 "
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
                            handleEditTaskModal={handleEditTaskModal}
                            setEditingTask={setEditingTask}
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
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
      />
      <EditTaskModal
        submitHandler={handleTaskUpdate}
        data={formData}
        inputHandler={handleChange}
        isOpen={isEditTaskModalOpen}
        onClose={() => setIsEditTaskModalOpen(false)}
        editingTask={editingTask}
      />
    </div>
  );
}

export default App;
