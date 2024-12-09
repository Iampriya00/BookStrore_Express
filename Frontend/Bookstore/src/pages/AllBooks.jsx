import { useEffect, useState } from "react";
import { allBooks } from "@/services/authService"; // Import the service function
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/auth/cartSlice";
import { useNavigate } from "react-router-dom";

function AllBooks() {
  // State to hold book data
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const booksdata = useAppSelector((state) => state.product);
  const navigate = useNavigate();
  const fetchBooks = async () => {
    try {
      await allBooks(); // Call the service function
    } catch (error) {
      console.error("Error fetching all books:", error);
    }
  };

  useEffect(() => {
    fetchBooks(); // Fetch books when the component mounts
  }, []);

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Books Available</h1>
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
