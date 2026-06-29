import { useState, useRef, useEffect } from "react";
import { MdOutlineArrowDropDown, MdCheckCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CategoryDropdown = () => {
  const currentRoute = location.pathname;
  const isBooksRoute = currentRoute.startsWith("/books");

  const categoryFromPath = isBooksRoute ? currentRoute.split("/")[2] : "";

  const categories = [
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Biography",
    "Romantic",
    "Horror",
    "Thriller",
    "Horror-Comedy",
    "Comedy",
    "Tragedy",
    "Adventure",
  ];

  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromPath || "",
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    navigate(`/books/${category}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative inline-block text-left transition duration-300  after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all hover:after:w-full"
      ref={dropdownRef}
    >
      {/* Button */}
      <ul className="px-4 py-2 tablet:p-0">
        <li
          className="cursor-pointer flex text-white hover:text-yellow-300 items-center"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedCategory || "Select a Category"}
          <MdOutlineArrowDropDown size={24} />
        </li>
      </ul>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute mt-3 w-64 rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500">
            <p className="text-white font-semibold text-sm">Select Category</p>
          </div>

          {/* List */}
          <ul className="max-h-60 bg-slate-200 overflow-y-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {categories.map((category, index) => (
              <li key={index}>
                <button
                  onClick={() => handleCategorySelect(category)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm rounded-lg transition-all duration-200 relative
              ${
                category === selectedCategory
                  ? "bg-indigo-600 text-white font-semibold"
                  : "bg-slate-200 text-gray-700"
              }
            `}
                >
                  {/* Left side */}
                  <span className="flex items-center gap-2">
                    {/* Dot */}
                    <span
                      className={`w-2 h-2 rounded-full ${
                        category === selectedCategory
                          ? "bg-white"
                          : "bg-indigo-400"
                      }`}
                    ></span>

                    {/* Text with underline hover effect */}
                    <span className="relative">{category}</span>
                  </span>

                  {/* Check icon */}
                  {category === selectedCategory && (
                    <MdCheckCircle size={18} className="text-white" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="px-4 py-2 text-xs text-gray-400 border-t">
            Click to select a category
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
