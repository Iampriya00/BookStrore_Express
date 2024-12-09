import React, { useState } from "react";
import navData from "../utils/navBar";
import { FaCartArrowDown, FaUser } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/auth/authSlice";
import { Link } from "react-router-dom";
import { clearCart } from "@/store/auth/cartSlice";

function Navbar() {
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cart = useAppSelector((state) => state.cart);
  // console.log(cart[0].quantity);

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  console.log(cart);
  console.log(totalQuantity);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const filteredNavData = isLoggedIn
    ? navData
    : navData.filter((_, index) => index < 3);

  return (
    <div className="flex items-center justify-between p-6 bg-zinc-600">
      <div className="flex items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5402/5402751.png"
          alt="Bookstore"
          className="w-8 h-8 mr-2"
        />
        <p className="text-2xl font-bold text-white">BookHeaven</p>
      </div>

      <ul className="flex space-x-4">
        {filteredNavData.map((navItem, index) => (
          <li key={index}>
            <Link to={navItem.path} className="text-white hover:text-gray-400">
              {navItem.item}
            </Link>
          </li>
        ))}
      </ul>

      {/* User Section */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <button
            onClick={() => {
              dispatch(logout());
              dispatch(clearCart());
            }}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Log Out
          </button>
        ) : (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              aria-label="User menu"
              className="focus:outline-none"
            >
              <FaUser color="white" size={24} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <ul>
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

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
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
    </div>
  );
}

export default Navbar;
