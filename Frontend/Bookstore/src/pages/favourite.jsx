import { Button } from "@/components/ui/button";
import {
  clearAllFromFav,
  fetchFavouriteBooks,
  removeFromFav,
} from "@/services/authService";
import queryClient from "@/utils/react-query";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";

function Favourite() {
  const [bookData, setBookData] = useState();
  useQuery("favoriteBooks", fetchFavouriteBooks, {
    onSuccess: (data) => {
      setBookData(data);
    },
    refetchOnMount: true,
  });
  const { mutateAsync: removeFromFavMut } = useMutation(removeFromFav, {
    onSuccess: () => {
      queryClient.invalidateQueries("favoriteBooks");
    },
  });

  const { mutateAsync: clearAllFromFavMut } = useMutation(clearAllFromFav, {
    onSuccess: () => {
      queryClient.invalidateQueries("favoriteBooks");
    },
  });

  async function removeFavBookByID(bookid) {
    await removeFromFavMut(bookid);
  }

  async function clearAll() {
    await clearAllFromFavMut();
  }

  return (
    <div>
      <h1>My Favourites</h1>
      <div style={{ padding: "20px" }} className="min-h-screen">
        <div className="flex justify-between m-6">
          {bookData && bookData.length > 0 && (
            <button
              onClick={() => clearAll()}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Clear All
            </button>
          )}
        </div>

        <div>
          {bookData && bookData.length > 0 ? (
            bookData.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginRight: "20px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
                <div style={{ flex: "1" }}>
                  <h3>{item.title}</h3>
                  <p>
                    Price: ₹
                    {item.price ? item.price.toFixed(2) : "Not Available"}
                  </p>
                </div>

                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => removeFavBookByID(item._id)}
                >
                  <FaTrash />
                </Button>
              </div>
            ))
          ) : (
            <p>No favourite items found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Favourite;
