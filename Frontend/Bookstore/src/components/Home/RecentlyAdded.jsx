import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import BookCard from "../BookCard/BookCard";
import { addToCart } from "@/store/auth/cartSlice";

const RecentlyAdded = () => {
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-recent-books"
        );
        setRecentlyAdded(response.data.data);
        setError(null); // Clear any previous error
      } catch (error) {
        console.error("Error fetching recently added books:", error);
        setError("Failed to load recently added books. Please try again.");
      }
    };

    fetchRecentBooks();
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
    <div className="px-4 mt-8">
      <h2 className="text-3xl text-center text-yellow-200">
        Recently Added Books
      </h2>
      {error && <p className="text-center text-red-500 my-4">{error}</p>}
      <div className="grid grid-cols-1 gap-4 my-4 sm:grid-cols-3 md:grid-cols-4">
        {recentlyAdded.length > 0
          ? recentlyAdded.map((book) => (
              <div key={book._id} className="flex flex-col items-center">
                <Link to={`/view-book-details/${book._id}`}>
                  <BookCard data={book} />
                </Link>
                <button
                  onClick={() => handleAddTOCart(book)}
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add to Cart
                </button>
              </div>
            ))
          : !error && (
              <p className="text-center text-gray-500">
                No recently added books available.
              </p>
            )}
      </div>
    </div>
  );
};

export default RecentlyAdded;
