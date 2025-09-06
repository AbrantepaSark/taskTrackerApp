export const Tabs = () => {
  return (
    <div className="text-sm  w-full flex justify-center font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex ">
        <li className="me-2">
          <a
            href="#"
            className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
          >
            All
          </a>
        </li>
        <li className="me-2">
          <a
            href="#"
            className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active "
            aria-current="page"
          >
            Active
          </a>
        </li>
        <li className="me-3">
          <a
            href="#"
            className="inline-block p-4 rounded-t-lg  "
            aria-current="page"
          >
            Completed
          </a>
        </li>
      </ul>
    </div>
  );
};
