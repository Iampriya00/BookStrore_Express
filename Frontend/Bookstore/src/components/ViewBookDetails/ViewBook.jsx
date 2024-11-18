import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const YourComponent = () => {
  const [bookData, setBookData] = useState([]);
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

  return (
    <div>
      <h1>Book Details</h1>
      {bookData ? (
        <div>{JSON.stringify(bookData)}</div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default YourComponent;
