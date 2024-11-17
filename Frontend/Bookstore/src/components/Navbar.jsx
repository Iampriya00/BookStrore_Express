import React, { useState } from "react";
import navData from "../utils/navBar";
import { FaUser } from "react-icons/fa";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex items-center justify-between p-6 bg-zinc-600">
      {/* Logo and Title */}
      <div className="flex items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5402/5402751.png"
          alt="Bookstore"
          className="w-8 h-8 mr-2"
        />
        <p className="text-2xl font-bold text-white">BookHeaven</p>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-4">
        {navData.map((navItem, index) => (
          <li key={index}>
            <a href={navItem.path} className="text-white hover:text-gray-400">
              {navItem.item}
            </a>
          </li>
        ))}
      </ul>

      {/* User Dropdown */}
      <div className="relative">
        {/* User Icon */}
        <div onClick={toggleDropdown} className="cursor-pointer">
          <FaUser color="white" size={24} />
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-100">
                <a href="/LogIn">LogIn</a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <a href="/SignIn">SignIn</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
