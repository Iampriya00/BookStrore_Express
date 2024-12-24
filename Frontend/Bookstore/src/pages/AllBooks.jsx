import { useState } from "react";
import { addFav, allBooks, deleteBook } from "@/services/authService"; // Import the service function
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/auth/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { FaHeart, FaRegEdit } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { MdDelete } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { useQuery } from "react-query";

function AllBooks() {
  // State to hold book data
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const { role } = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const { data: booksdata = [], isLoading } = useQuery("allbooks", allBooks, {
    refetchOnMount: true,
  });

  const filteredBooks = booksdata.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add books to the cart
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

  // Delete books
  function handleDelete(bookId) {
    deleteBook(bookId);
  }
  const handleAddToFav = async (bookid) => {
    if (!isLoggedIn) {
      navigate("/LogIn");
    } else {
      addFav(bookid);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-yellow-700">
          All Books Available
        </h1>

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
            to="/addnewbook"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Add Books
          </Link>
        )}
      </div>

      {isLoading ? (
        <p className="text-gray-600">Loading books...</p>
      ) : filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book._id} // Use unique `book._id` for the `key` prop instead of `index`
              className="border rounded-lg p-4 shadow hover:shadow-lg transition relative"
            >
              <Link to={`/view-book-details/${book._id}`}>
                <div className="flex flex-col">
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
                        Price: ₹ {book.price}
                      </p>
                      <p className="text-sm text-gray-500 font-semibold">
                        Category:{" "}
                        {book.category.filter((part) => !!part).join(", ")}
                      </p>
                    </div>

                    {role === "admin" && (
                      <div className="flex items-start">
                        <Link to={`/editbook/${book._id}`}>
                          <FaRegEdit className="cursor-pointer" />
                        </Link>
                        <button
                          onClick={() => handleDelete(book._id)}
                          className="ml-2"
                          style={{ cursor: "pointer" }}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Link>

              {/* Heart icon positioning */}
              <FaHeart
                className="absolute top-[14rem] right-4 text-red-500 cursor-pointer"
                onClick={() => handleAddToFav(book._id)}
              />

              {/* Add to Cart Button */}
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

export default AllBooks;
