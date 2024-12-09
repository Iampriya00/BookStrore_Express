import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <ul className="space-y-4">
      <li>
        <NavLink to="/profile" className="block text-white hover:text-gray-300">
          Profile Overview
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/profile/orders"
          className="block text-white hover:text-gray-300"
        >
          Orders
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/profile/settings"
          className="block text-white hover:text-gray-300"
        >
          Account Settings
        </NavLink>
      </li>
    </ul>
  );
};

export default Sidebar;
