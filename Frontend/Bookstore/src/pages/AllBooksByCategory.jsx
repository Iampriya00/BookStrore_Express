import { useState } from "react";
import { allBooks } from "@/services/authService"; // Import the service function
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/auth/cartSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { FaRegEdit } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { MdDelete } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { useQuery } from "react-query";

function AllBooksByCategory() {
  // State to hold book data
  const { category } = useParams();

  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const { role } = useAppSelector((state) => state.auth.user);
  const booksdata = useAppSelector((state) => state.product);
  const navigate = useNavigate();
  useQuery("allbooks", allBooks, {
    refetchOnMount: true,
  });
  const filteredBooks = booksdata
    .filter((book) =>
      book.category
        .map((cat) => cat.toLowerCase())
        .includes(category.toLowerCase())
    )
    .filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  //Add books to the cart
  function handleAddTOCart(book) {
    if (!isLoggedIn) {
      navigate("/LogIn");
    } else {
      const data = {
        ...book,
        quantity: 1, // Set the quantity to 1 when adding a new book
      };
      dispatch(addToCart(data)); // Dispatch the action to add the book to the cart
    }
  }

  return (
    <div className="container h-screen mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">All Books Available</h1>
        <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md shadow-sm">
          <input
            type="search"
            placeholder="Search"
            className="w-64 p-2 text-sm bg-transparent outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CiSearch className="text-gray-500 text-xl cursor-pointer" />
        </div>
        {role === "admin" && (
          <Link
            to={"/addnewbook"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Add Books
          </Link>
        )}
      </div>
      {filteredBooks && filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={book.url}
                alt={book.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Author: {book.author}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    Added on: {book.dateAdded}
                  </p>
                  <p className="text-sm text-green-600 font-semibold">
                    Price: ${book.price}
                  </p>
                  <p className="text-sm text-gray-500 font-semibold">
                    Category:{" "}
                    {book.category.filter((part) => !!part).join(", ")}
                  </p>
                </div>
                {role === "admin" && (
                  <div className="flex items-start">
                    <Link to={`/editbook/${book._id}`}>
                      <FaRegEdit style={{ cursor: "pointer" }} />
                    </Link>
                    <button
                      onClick={() => handleDelete(book._id)}
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                    >
                      <MdDelete />
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleAddTOCart(book)}
                className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No books available.</p>
      )}
    </div>
  );
}

export default AllBooksByCategory;
