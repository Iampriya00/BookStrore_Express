import { Button } from "@/components/ui/button";
import { editBookDetails, getBookDetailsByID } from "@/services/authService";
import { setBook } from "@/store/auth/bookSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import queryClient from "@/utils/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

function Editbook() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const bookData = useAppSelector((state) => state.book);

  // Fetching book details by id
  useQuery(`view-book-details/${id}`, () => getBookDetailsByID(id), {
    refetchOnMount: true,
    onSuccess: (res) => {
      const book = { ...res.book, price: String(res.book.price) };
      dispatch(setBook(book));
    },
  });

  // Validation
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
    category: z.array(z.string()).min(1, {
      message: "Please select at least one category",
    }),
  });

  // Set default value
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
      category: [],
    },
  });

  // Reset book data fields
  React.useEffect(() => {
    if (bookData) {
      reset(bookData);
    }
  }, [bookData, reset]);

  const { mutateAsync: editBookMutation, isLoading } = useMutation(
    editBookDetails,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`view-book-details/${id}`);
        navigate("/books");
      },
    }
  );
  // Form Submit
  const handleeditSubmit = async (data) => {
    const payload = {
      url: data.url,
      price: data.price,
      des: data.des,
      language: data.language,
      bookId: id,
      title: data.title,
      author: data.author,
      category: data.category,
    };
    await editBookMutation(payload);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Edit Profile Form */}
      <div className="w-3/4 p-6">
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Edit Book Details
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(handleeditSubmit)}>
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
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select categories
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
                      className="accent-indigo-500 w-3 h-3 rounded-full transform scale-125 focus:outline-none"
                    />

                    <label
                      htmlFor={category}
                      className="text-base text-gray-700"
                    >
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

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Update Book
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Editbook;
