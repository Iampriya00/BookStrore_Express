import React, { useEffect, useState } from "react";
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
    <div className="mt-8 px-4">
      <h2 className="text-3xl text-yellow-200 text-center">
        Recently Added Books
      </h2>
      <div className="my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {recentlyAdded &&
          recentlyAdded.map((item, i) => (
            <div key={i}>
              <BookCard data={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
