import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const YourComponent = () => {
  const [bookData, setBookData] = useState(null);
  const [cart, setCart] = useState([]);
  const { id } = useParams();

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

  const addToCart = (book) => {
    setCart((prevCart) => [...prevCart, book]);
    alert(`${book.title} has been added to your cart.`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Book Details</h1>
      {bookData ? (
        <div className="flex gap-8 items-start">
          <div className="px-12 py-8 bg-zinc-900 rounded-md">
            <img
              src={bookData.url}
              alt={bookData.title || "Book Image"}
              className="w-full h-auto rounded"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{bookData.title}</h2>
            <p className="text-lg text-gray-600 mb-2">By: {bookData.author}</p>
            <p className="text-gray-700 mb-4">{bookData.des}</p>
            <p className="text-gray-600">Language: {bookData.language}</p>
            <p className="text-lg font-bold my-4 ">Price: ${bookData.price}</p>
            <Link
              to="/cart"
              onClick={() => addToCart(bookData)}
              className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
            >
              Add to Cart
            </Link>
          </div>
        </div>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default YourComponent;
