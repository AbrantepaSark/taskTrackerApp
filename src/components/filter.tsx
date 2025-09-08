import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const Filter = ({
  setPriorityFilter,
}: {
  setPriorityFilter: (filter: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const filterOptions = ["All", "Low", "Medium", "High"];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Filter ▾
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
          <ul className="py-1">
            {filterOptions.map((filter) => (
              <li
                key={uuidv4()}
                onClick={() => {
                  setPriorityFilter(filter);
                  toggleDropdown();
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {filter}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
