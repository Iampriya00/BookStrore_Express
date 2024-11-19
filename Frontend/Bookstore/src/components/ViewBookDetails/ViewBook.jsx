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
      {bookData && (
        <div className="flex gap-8">
           <div className="px-12 py-8 bg-zinc-900">
              <img src="{bookData.url}" alt="" srcset="" />
            </div>
            <div>
              <h1>{bookData.title}</h1>
              <p>{bookData.author}</p>
              <p>{bookData.des}</p>
              <p>{bookData.language}</p>
              <p>{bookData.price}</p>
            </div>
        </div>
      )}
    </div>
  );
}  

export default YourComponent;
