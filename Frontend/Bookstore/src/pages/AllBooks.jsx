import { useEffect } from "react";
import { allBooks, deleteBook } from "@/services/authService"; // Import the service function
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/auth/cartSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { FaRegEdit } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { MdDelete } from "react-icons/md";

function AllBooks() {
  // State to hold book data
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const { role } = useAppSelector((state) => state.auth.user);
  const booksdata = useAppSelector((state) => state.product);
  const navigate = useNavigate();

  //Fetching all the books
  useEffect(() => {
    allBooks();
  }, []);

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

  //Delete books
  function handleDelete(bookId) {
    deleteBook(bookId);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">All Books Available</h1>
        {role === "admin" && (
          <Link
            to={"/addnewbook"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Add Books
          </Link>
        )}
      </div>
      {booksdata && booksdata.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {booksdata.map((book, index) => (
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

export default AllBooks;
