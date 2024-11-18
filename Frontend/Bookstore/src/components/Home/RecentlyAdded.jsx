import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import axios from "axios";
import BookCard from "../BookCard/BookCard";

const RecentlyAdded = () => {
  const [recentlyAdded, setRecentlyAdded] = useState([]);

  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-recent-books"
        );
        setRecentlyAdded(response.data.data);
      } catch (error) {
        console.error("Error fetching recently added books:", error);
      }
    };

    fetchRecentBooks();
  }, []);
  return (
    <div className="px-4 mt-8">
      <h2 className="text-3xl text-center text-yellow-200">
        Recently Added Books
      </h2>
      <div className="grid grid-cols-1 gap-4 my-4 sm:grid-cols-3 md:grid-cols-4">
        {recentlyAdded.length > 0 ? (
          recentlyAdded.map((x, idx) => (
            <Link to={`/view-book-details/${x._id}`} key={idx}>
              <BookCard data={x} />
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No recently added books available.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentlyAdded;
