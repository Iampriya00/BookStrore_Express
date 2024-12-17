import React from "react";

const BookCard = ({ data }) => {
  return (
    <>
      <div className="bg-white p-4 border border-gray-200 rounded-md">
        <img
          src={data.url}
          className="w-full h-48 object-cover mt-2 rounded-md"
        />
        <h3 className="text-xl font-semibold text-black min-h-14 flex items-center">
          {data.title}
        </h3>
        <p className="text-lg font-bold text-gray-600">{data.author}</p>
        <p className="text-sm text-gray-400">{data.dateAdded}</p>
        <p className="text-base text-emerald-700"> ₹{data.price}</p>
        <p className="text-base text-gray-400">
          {data.category.filter((part) => !!part).join(", ")}
        </p>
      </div>
    </>
  );
};

export default BookCard;
