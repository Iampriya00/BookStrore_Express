import React from "react";
import { addNewBook } from "@/services/authService";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

function AddNewBook() {
  const navigate = useNavigate();

  // Add book validation schema using Zod
  const formSchema = z.object({
    url: z.string().min(2, {
      message: "Please enter book image url.",
    }),
    title: z.string().min(1, {
      message: "Please enter book title.",
    }),
    author: z.string().min(1, {
      message: "Please enter author name.",
    }),
    price: z.string().min(1, {
      message: "Please enter book price.",
    }),
    des: z.string().min(2, {
      message: "Please enter book description.",
    }),
    language: z.string().min(1, { message: "Please enter book language." }),
    category: z
      .array(z.string())
      .min(1, { message: "Please select at least one category." }),
  });

  // Set up form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      title: "",
      author: "",
      price: "",
      des: "",
      language: "",
      category: [],
    },
  });

  // Handle form submission (adding a book)
  const handleAddBooks = async (data) => {
    await addNewBook(data); // Add the new book
    navigate("/books"); // Redirect to the books list page
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Add New Book</h1>
      <form className="space-y-4" onSubmit={handleSubmit(handleAddBooks)}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Book Image URL:
          </label>
          <input
            type="text"
            {...register("url")}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.url && (
            <p className="text-red-500 text-xs mt-1">{errors.url.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Book Title:
          </label>
          <input
            type="text"
            {...register("title")}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Author:
          </label>
          <input
            type="text"
            {...register("author")}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.author && (
            <p className="text-red-500 text-xs mt-1">{errors.author.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price:
          </label>
          <input
            type="text"
            {...register("price")}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            {...register("des")}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.des && (
            <p className="text-red-500 text-xs mt-1">{errors.des.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Language:
          </label>
          <input
            type="text"
            {...register("language")}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.language && (
            <p className="text-red-500 text-xs mt-1">
              {errors.language.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Categories:
          </label>
          {/* Book Category Checkboxes */}
          <div className="space-y-2">
            {[
              "Fiction",
              "Non-Fiction",
              "Science Fiction",
              "Fantasy",
              "Mystery",
              "Biography",
              "Romantic",
              "Horror",
              "Thriller",
              "Horror-Comedy",
              "Comedy",
              "Tragedy",
              "Advanture",
            ].map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <input
                  id={category}
                  type="checkbox"
                  value={category}
                  {...register("category")}
                  className="h-4 w-4 text-indigo-500 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor={category} className="text-sm text-gray-700">
                  {category}
                </label>
              </div>
            ))}
          </div>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">
              {errors.category.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddNewBook;
