import React, { useState } from "react";
import navData from "../utils/navBar";
import {
  FaCartArrowDown,
  FaHeart,
  FaUser,
  FaUserAstronaut,
  FaUserTie,
} from "react-icons/fa";
import { useAppSelector } from "@/store/hooks";
import { Link } from "react-router-dom";
import { handleLogout } from "@/services/authService";
import CategoryDropdown from "./categoryDrp";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cart = useAppSelector((state) => state.cart);
  const { role } = useAppSelector((state) => state.auth.user);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const filteredNavData = isLoggedIn
    ? navData
    : navData.filter((_, index) => index < 3);

  return (
    <nav className="bg-zinc-600 p-4 relative">
      {/* Navbar container */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5402/5402751.png"
            alt="Bookstore"
            className="w-8 h-8 mr-2"
          />
          <p className="text-2xl font-bold text-white">BookHeaven</p>
        </div>
        {/* Links (Desktop) */}
        <ul className="hidden lg:flex space-x-4 ">
          {filteredNavData.map((navItem, index) => (
            <li key={index}>
              <Link
                to={navItem.path}
                className="text-white hover:text-gray-400"
              >
                {navItem.item}
              </Link>
            </li>
          ))}
          <CategoryDropdown />
        </ul>
        {/*Icon */}
        <div className="flex">
          {/*Like Button*/}
          <Link to={isLoggedIn ? "/favourite" : "/LogIn"}>
            <FaHeart
              size={24}
              color="white"
              aria-label="Cart"
              className="hover:text-gray-400 me-5"
            />
          </Link>
          {/* Cart Icon */}
          <Link to={isLoggedIn ? "/cart" : "/LogIn"} className="relative">
            <FaCartArrowDown
              size={24}
              color="white"
              aria-label="Cart"
              className="hover:text-gray-400"
            />
            <span className="absolute top-[-8px] right-[-8px] flex items-center justify-center bg-red-500 text-white text-xs font-bold h-5 w-5 rounded-full">
              {totalQuantity}
            </span>
          </Link>
        </div>
        {/* Hamburger Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {/* User Section */}
        <div className="hidden lg:flex items-center space-x-4">
          {role === "user" && (
            <Link to={"/profile"} className="text-white p-2 rounded">
              <FaUserTie size={20} />
            </Link>
          )}
          {role === "admin" && (
            <Link to={"/adminDashboard"} className="text-white p-2 rounded">
              <FaUserAstronaut size={20} />
            </Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={() => handleLogout()}
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Log Out
            </button>
          ) : (
            <div className="relative">
              <button onClick={toggleDropdown} className="focus:outline-none">
                <FaUser color="white" size={24} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-10">
                  <ul className="w-32">
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/LogIn">Log In</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/SignIn">Sign Up</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Dropdown for Mobile */}
      {isMenuOpen && (
        <div
          className={`lg:hidden mt-4 absolute bg-slate-600 z-20 w-full left-0 transition-transform duration-500 ease-in-out transform>
          }`}
        >
          <ul className="flex flex-col space-y-2">
            {filteredNavData.map((navItem, index) => (
              <li key={index}>
                <Link
                  to={navItem.path}
                  className="block px-4 py-2 text-white hover:bg-gray-700 rounded"
                >
                  {navItem.item}
                </Link>
              </li>
            ))}
            <li className="">
              <CategoryDropdown />
            </li>
            {role === "user" && (
              <Link to={"/profile"} className="block px-4 py-2 text-white">
                Profile
              </Link>
            )}
            {role === "admin" && (
              <Link
                to={"/adminDashboard"}
                className="block px-4 py-2 text-white"
              >
                Profile
              </Link>
            )}
            {isLoggedIn ? (
              <button
                onClick={() => handleLogout()}
                className="block px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Log Out
              </button>
            ) : (
              <div className="flex flex-col space-y-1">
                <Link
                  to="/LogIn"
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                >
                  Log In
                </Link>
                <Link
                  to="/SignIn"
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
