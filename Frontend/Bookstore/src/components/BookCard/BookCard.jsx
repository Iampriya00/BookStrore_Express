import React from "react";

const BookCard = ({ data }) => {
  return (
    <>
      <div className="bg-white p-4 border border-gray-200 rounded-md">
        <img
          src={data.url}
          className="w-full h-48 object-cover mt-2 rounded-md"
        />
        <div>
          <h3 className="text-xl font-semibold text-black">{data.title}</h3>
          <p className="text-sm text-gray-600">{data.author}</p>
          <p className="text-sm text-gray-400">{data.dateAdded}</p>
          <p className="text-sm text-gray-400">{data.price}</p>
        </div>
      </div>
    </>
  );
};

export default BookCard;
