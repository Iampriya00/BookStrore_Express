import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/auth/cartSlice";
import { addFav } from "@/services/authService";
import RecentlyAdded from "../Home/RecentlyAdded";

const ViewBook = () => {
  const [bookData, setBookData] = useState(null);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/view-book-details/${id}`
        );
        setBookData(response.data.book);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    if (id) fetchBooks();
  }, [id]);

  const handleAddTOCart = (book) => {
    if (!isLoggedIn) {
      navigate("/LogIn");
    } else {
      const data = {
        ...book,
        quantity: 1,
      };
      dispatch(addToCart(data));
    }
  };

  const handleAddToFav = async (bookid) => {
    if (!isLoggedIn) {
      navigate("/LogIn");
    } else {
      addFav(bookid);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Book Details</h1>
      {bookData ? (
        <div className="flex flex-wrap gap-8 items-center">
          {/* Book Image */}
          <div className="px-12 py-8 bg-zinc-900 rounded-md max-w-[300px]">
            <img
              src={bookData.url || "https://via.placeholder.com/300x500"}
              alt={bookData.title || "Book Image"}
              className="w-full max-h-[500px] rounded"
            />
          </div>

          {/* Book Information */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">
              {bookData.title || "Untitled"}
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              By: {bookData.author || "Unknown"}
            </p>
            <p className="text-gray-700 mb-4">
              {bookData.description || "No description available."}
            </p>
            <p className="text-gray-600">
              Language: {bookData.language || "Not specified"}
            </p>
            <p className="text-lg font-bold my-4">
              Price: ₹
              {bookData.price ? bookData.price.toFixed(2) : "Not available"}
            </p>
            <div className="flex">
              <button
                onClick={() => handleAddTOCart(bookData)}
                className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleAddToFav(bookData._id)}
                className="mt-4 px-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-700 ms-3"
              >
                Add To Favourite
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading book details...</p>
      )}
      <RecentlyAdded/>
    </div>
  );
};

export default ViewBook;
