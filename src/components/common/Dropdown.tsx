import { FC } from "react";
import { TDropdown } from "../componentTypes";

export const Dropdown: FC<TDropdown> = ({
  name,
  items,
  isOpen,
  toggleDropdown,
}) => {
  return (
    <div className="relative w-full">
      <button
        id="dropdownButton"
        className="w-full text-white capitalize focus:outline-none font-medium text-sm px-5 py-2.5 text-center flex items-center justify-between border-b border-white/60"
        type="button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        {name}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          id="dropdown"
          className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 shadow rounded-lg dark:bg-gray-700 w-full"
        >
          <ul className="w-full py-2 text-sm text-gray-700 dark:text-gray-200">
            {items.map((item, index) => (
              <li
                key={index}
                className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={toggleDropdown}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
