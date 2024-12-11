import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAppSelector } from "@/store/hooks";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { role } = useAppSelector((state) => state.auth.user);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="tablet:hidden p-2 bg-gray-800 text-white rounded-md focus:outline-none"
      >
        <GiHamburgerMenu />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } tablet:relative tablet:left-[-30px] tablet:translate-x-0 w-64 bg-gray-800 text-white p-6 transition-transform duration-300 ease-in-out`}
      >
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/profile"
              className="block text-white hover:text-gray-300"
            >
              Profile Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/orders"
              className="block text-white hover:text-gray-300"
            >
              Orders
            </NavLink>
          </li>
          <li>
            <Link
              to="/settings"
              className="block text-white hover:text-gray-300"
            >
              Account Settings
            </Link>
          </li>
          {role === "admin" && (
            <li>
              <Link
                to="/addnewbook"
                className="block text-white hover:text-gray-300"
              >
                Add New Book
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Overlay (optional, for when sidebar is open on small screens) */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
