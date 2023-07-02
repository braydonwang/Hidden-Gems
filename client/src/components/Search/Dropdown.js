import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { classNames } from "../../utils/Classnames";

const allCategoryNames = [
  "All Categories",
  "Food",
  "Entertainment",
  "Shopping",
  "Photography",
];

export default function Dropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [categoryNames, setCategoryNames] = useState([
    "Food",
    "Entertainment",
    "Shopping",
    "Photography",
  ]);
  const [currentCategory, setCurrentCategory] = useState("All Categories");

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setShowDropdown(false);
    setCurrentCategory(category);
    setTimeout(() => {
      setCategoryNames(allCategoryNames.filter((cat) => cat !== category));
    }, 100);
  };

  return (
    <div className="flex flex-col flex-shrink-0 justify-center z-50">
      <Menu as="div" className="relative inline-block text-left pr-3 w-44">
        <div className="flex">
          <Menu.Button
            onClick={() => setShowDropdown(!showDropdown)}
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            {currentCategory}
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-gray-400 absolute right-6"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          show={showDropdown}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {categoryNames.map((category, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <button
                      onClick={(e) => handleCategoryClick(e, category)}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm w-full text-left"
                      )}
                    >
                      {category}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
