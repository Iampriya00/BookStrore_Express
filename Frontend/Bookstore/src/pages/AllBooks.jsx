import React, { useEffect, useState } from "react";
import { allBooks } from "@/services/authService"; // Import the service function
import { useAppSelector } from "@/store/hooks";

function AllBooks() {
  // State to hold book data
  const booksdata = useAppSelector((state) => state.product);

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
