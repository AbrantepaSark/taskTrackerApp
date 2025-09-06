import { useState } from "react";
import "./App.css";
import { SearchBar } from "./components/search";
import { Filter } from "./components/filter";
import { Task } from "./components/task";
import { Modal } from "./components/modal";
import { MdAdd } from "react-icons/md";

function App() {
  //const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => setIsModalOpen(!isModalOpen);

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
          <Task
            title="Heading"
            description="The alert component can be used to provide information to your users such as success "
            priority="HIGH"
            modalHandler={handleModal}
            deleteHandler={() => {}}
          />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
