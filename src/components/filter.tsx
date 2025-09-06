import { useState } from "react";

export const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown button */}
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Filter ▾
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
          <ul className="py-1">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">All</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Low</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              medium
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">High</li>
          </ul>
        </div>
      )}
    </div>
  );
};
