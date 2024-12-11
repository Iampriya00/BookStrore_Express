import { editBookDetails, getBookDetailsByID } from "@/services/authService";
import { setBook } from "@/store/auth/bookSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { z } from "zod";

function Editbook() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const bookData = useAppSelector((state) => state.book);
  useQuery(`/view-book-details/${id}`, () => getBookDetailsByID(id), {
    onSuccess: (res) => {
      const book = { ...res.book, price: String(res.book.price) };
      dispatch(setBook(book));
    },
  });

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
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: bookData || {
      url: "",
      title: "",
      author: "",
      price: "",
      des: "",
      language: "",
    },
  });

  React.useEffect(() => {
    if (bookData) {
      reset(bookData);
    }
  }, [bookData, reset]);

  //Form Submit
  const handleeditSubmit = async (data) => {
    const payload = {
      url: data.url,
      price: data.price,
      des: data.des,
      language: data.language,
      bookId: id,
      title: data.title,
      author: data.author,
    };
    await editBookDetails(payload);
  };
  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        {/* Edit Profile Form */}
        <div className="w-3/4 p-6">
          <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Edit Book Details
            </h2>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleeditSubmit)}
            >
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
                  <p className="text-red-500 text-xs mt-1">
                    {errors.url.message}
                  </p>
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
                  <p className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </p>
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
                  <p className="text-red-500 text-xs mt-1">
                    {errors.author.message}
                  </p>
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
                  <p className="text-red-500 text-xs mt-1">
                    {errors.price.message}
                  </p>
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
                  <p className="text-red-500 text-xs mt-1">
                    {errors.des.message}
                  </p>
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
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Add Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Editbook;
