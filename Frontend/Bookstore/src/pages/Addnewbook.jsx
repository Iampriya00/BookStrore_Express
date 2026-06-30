import React from "react";
import { addNewBook } from "@/services/authService";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

// =====================
// OPTIMIZED ZOD SCHEMA
// =====================
const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid book image URL." }),
  title: z.string().min(1, { message: "Please enter book title." }),
  author: z.string().min(1, { message: "Please enter author name." }),
  price: z.coerce
    .number({ invalid_type_error: "Price must be a valid number" })
    .positive({ message: "Price must be greater than 0" }),
  des: z.string().min(2, { message: "Please enter book description." }),
  language: z.string().min(1, { message: "Please enter book language." }),
  category: z
    .array(z.string())
    .min(1, { message: "Please select at least one category." }),
});

function AddNewBook() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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

  // =====================
  // SUBMIT FUNCTION
  // =====================
  const handleAddBooks = async (data) => {
    try {
      // Data is already sanitized and 'price' is converted to a Number by Zod Coercion!
      await addNewBook(data);
      reset(); // Resets the form fields
      navigate("/books");
    } catch (error) {
      console.error(
        "Add Book UI Error:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-900/70 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Add New Book
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit(handleAddBooks)}>
          {/* URL */}
          <div>
            <label className="text-gray-300 text-sm">Book Image URL</label>
            <input
              type="text"
              {...register("url")}
              className="w-full mt-1 p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            {errors.url && (
              <p className="text-red-400 text-xs mt-1">{errors.url.message}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="text-gray-300 text-sm">Book Title</label>
            <input
              type="text"
              {...register("title")}
              className="w-full mt-1 p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            {errors.title && (
              <p className="text-red-400 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="text-gray-300 text-sm">Author</label>
            <input
              type="text"
              {...register("author")}
              className="w-full mt-1 p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            {errors.author && (
              <p className="text-red-400 text-xs mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="text-gray-300 text-sm">Price</label>
            <input
              type="number"
              step="0.01"
              {...register("price")}
              className="w-full mt-1 p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            {errors.price && (
              <p className="text-red-400 text-xs mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-300 text-sm">Description</label>
            <textarea
              {...register("des")}
              rows={4}
              className="w-full mt-1 p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            {errors.des && (
              <p className="text-red-400 text-xs mt-1">{errors.des.message}</p>
            )}
          </div>

          {/* Language */}
          <div>
            <label className="text-gray-300 text-sm">Language</label>
            <input
              type="text"
              {...register("language")}
              className="w-full mt-1 p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            {errors.language && (
              <p className="text-red-400 text-xs mt-1">
                {errors.language.message}
              </p>
            )}
          </div>

          {/* Categories */}
          <div>
            <label className="text-gray-300 text-sm block mb-2">
              Select Categories
            </label>

            <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
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
                "Comedy",
                "Tragedy",
                "Adventure",
              ].map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                >
                  <input
                    type="checkbox"
                    value={category}
                    {...register("category")}
                    className="accent-indigo-500 w-4 h-4 rounded"
                  />
                  {category}
                </label>
              ))}
            </div>

            {errors.category && (
              <p className="text-red-400 text-xs mt-2">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg active:scale-[0.99]"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNewBook;
