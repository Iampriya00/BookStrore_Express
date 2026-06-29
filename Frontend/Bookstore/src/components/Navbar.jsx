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
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 backdrop-blur-xl border-b border-white/10 shadow-[0_0_25px_rgba(99,102,241,0.4)]">
      {/* Container */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5402/5402751.png"
              alt="Bookstore"
              className="w-8 h-8"
            />
          </div>

          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
            BookHeaven
          </h1>
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-8 text-[16px] font-medium">
          {filteredNavData.map((navItem, index) => (
            <li key={index}>
              <Link
                to={navItem.path}
                className="relative text-white transition duration-300 hover:text-yellow-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all hover:after:w-full"
              >
                {navItem.item}
              </Link>
            </li>
          ))}
          <CategoryDropdown />
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-5">
          {/* Favourite */}
          <Link to={isLoggedIn ? "/favourite" : "/LogIn"}>
            <FaHeart
              className="text-white hover:text-pink-400 transition duration-300 hover:scale-125"
              size={22}
            />
          </Link>

          {/* Cart */}
          <Link to={isLoggedIn ? "/cart" : "/LogIn"} className="relative">
            <FaCartArrowDown
              className="text-white hover:text-yellow-300 transition duration-300 hover:scale-125"
              size={22}
            />

            <span className="absolute -top-2 -right-2 flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold h-5 w-5 rounded-full shadow-lg">
              {totalQuantity}
            </span>
          </Link>

          {/* Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
            >
              <svg
                className="w-6 h-6 text-white"
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
          <div className="hidden lg:flex items-center gap-4">
            {role === "user" && (
              <Link
                to="/profile"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition"
              >
                <FaUserTie size={18} className="text-white" />
              </Link>
            )}

            {role === "admin" && (
              <Link
                to="/adminDashboard"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition"
              >
                <FaUserAstronaut size={18} className="text-white" />
              </Link>
            )}

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:scale-105 transition shadow-lg"
              >
                Log Out
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition"
                >
                  <FaUser className="text-white" size={20} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-40 rounded-xl overflow-hidden bg-white shadow-2xl">
                    <ul>
                      <li className="px-4 py-3 hover:bg-slate-100 transition">
                        <Link to="/LogIn">Log In</Link>
                      </li>
                      <li className="px-4 py-3 hover:bg-slate-100 transition">
                        <Link to="/SignIn">Sign Up</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-3 px-4">
          {/* Glass Card Container */}
          <div className="rounded-2xl overflow-hidden bg-slate-900/80 backdrop-blur-2xl border border-white/10 shadow-2xl animate-fadeIn">
            {/* Header Strip */}
            <div className="px-5 py-3 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border-b border-white/10">
              <h2 className="text-white font-semibold text-sm tracking-wide">
                Navigation Menu
              </h2>
            </div>

            <ul className="flex flex-col">
              {/* Main Links */}
              {filteredNavData.map((navItem, index) => (
                <li key={index}>
                  <Link
                    to={navItem.path}
                    className="flex items-center justify-between px-6 py-4 text-white hover:bg-white/10 transition-all duration-300 group"
                  >
                    <span className="group-hover:translate-x-1 transition">
                      {navItem.item}
                    </span>
                    <span className="text-white/30 group-hover:text-white transition">
                      →
                    </span>
                  </Link>
                </li>
              ))}

              {/* Category */}
              <li className="px-6 py-4 border-t border-white/10">
                <div className="bg-white/5 rounded-xl p-3 hover:bg-white/10 transition">
                  <CategoryDropdown />
                </div>
              </li>

              {/* Role Links */}
              {role === "user" && (
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-6 py-4 text-white hover:bg-white/10 transition"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Profile
                  </Link>
                </li>
              )}

              {role === "admin" && (
                <li>
                  <Link
                    to="/adminDashboard"
                    className="flex items-center gap-3 px-6 py-4 text-white hover:bg-white/10 transition"
                  >
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                    Admin Dashboard
                  </Link>
                </li>
              )}

              {/* Auth Section */}
              {isLoggedIn ? (
                <li className="p-4">
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-[1.02] active:scale-95 transition"
                  >
                    Log Out
                  </button>
                </li>
              ) : (
                <li className="p-4 space-y-3">
                  <Link
                    to="/LogIn"
                    className="block w-full text-center py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
                  >
                    Log In
                  </Link>

                  <Link
                    to="/SignIn"
                    className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-[1.02] transition"
                  >
                    Sign Up
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
