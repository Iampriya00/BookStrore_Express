import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  FiUser,
  FiShoppingBag,
  FiSettings,
  FiPlusSquare,
  FiX,
} from "react-icons/fi";
import { useAppSelector } from "@/store/hooks";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { role } = useAppSelector((state) => state.auth.user);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const linkBaseClass =
    "flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium tracking-wide transition-all duration-200 group";

  const activeClass =
    "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm shadow-indigo-500/5";

  const inactiveClass = "text-slate-400 hover:text-white hover:bg-white/5";

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="tablet:hidden fixed top-4 left-4 z-50 p-3 bg-slate-900 text-white rounded-xl shadow-lg"
      >
        <GiHamburgerMenu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 w-72 bg-slate-950 text-white p-6
        transform transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        tablet:relative tablet:translate-x-0
        border-r border-slate-800 shadow-2xl flex flex-col overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs uppercase tracking-widest font-semibold text-indigo-400">
            Navigation
          </span>

          <button
            onClick={toggleSidebar}
            className="tablet:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <ul className="space-y-2 flex-1">
          <li>
            <NavLink
              to="/profile"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <FiUser />
              <span>Profile Overview</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/orders"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <FiShoppingBag />
              <span>Orders</span>
            </NavLink>
          </li>

          <li>
            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className={`${linkBaseClass} ${inactiveClass}`}
            >
              <FiSettings />
              <span>Account Settings</span>
            </Link>
          </li>

          {role === "admin" && (
            <li className="pt-4 mt-4 border-t border-slate-800/60">
              <Link
                to="/addnewbook"
                onClick={() => setIsOpen(false)}
                className={`${linkBaseClass} text-rose-400 hover:text-rose-300 hover:bg-rose-500/10`}
              >
                <FiPlusSquare />
                <span>Add New Book</span>
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Overlay FIXED */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        />
      )}
    </>
  );
};

export default Sidebar;
