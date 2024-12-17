import { useState, useRef, useEffect } from "react";
import { MdOutlineArrowDropDown, MdCheckCircle } from "react-icons/md"; // Import the checkmark icon
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
    categoryFromPath || ""
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
  const dropdownRef = useRef(null); // Ref to track the dropdown element
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false); // Close the dropdown after selection
    navigate(`/books/${category}`); // Navigate to the category-specific page
  };

  // Close dropdown if clicked outside
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
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Dropdown Button */}
      <ul className="px-4 py-2 tablet:p-0">
        <li
          className=" cursor-pointer flex text-white hover:text-gray-400"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedCategory || "Select a Category"}{" "}
          <MdOutlineArrowDropDown size={24} />
        </li>
      </ul>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <ul className="py-1">
            {categories.map((category, index) => (
              <li key={index}>
                <button
                  className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left flex items-center justify-between ${
                    category === selectedCategory && "bg-gray-300"
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                  {/* Conditionally render the checkmark if the category is selected */}
                  {category === selectedCategory && <MdCheckCircle size={18} />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
