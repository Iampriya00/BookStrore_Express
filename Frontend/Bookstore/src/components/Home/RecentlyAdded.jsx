import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import BookCard from "../BookCard/BookCard";
import { addToCart } from "@/store/auth/cartSlice";

// Import Swiper React components and required styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { ShoppingCart } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

// Injected global dark styles specifically for Swiper's internal pagination dots
const swiperDarkStyles = `
  .dark .swiper-pagination-bullet {
    background: #94a3b8 !important; /* Slate 400 */
    opacity: 0.4;
  }
  .dark .swiper-pagination-bullet-active {
    background: #3b82f6 !important; /* Blue 500 */
    opacity: 1;
  }
`;

const RecentlyAdded = () => {
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-recent-books",
        );
        setRecentlyAdded(response.data.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching recently added books:", error);
        setError("Failed to load recently added books. Please try again.");
      }
    };

    fetchRecentBooks();
  }, []);

  function handleAddTOCart(book) {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const data = {
        ...book,
        quantity: 1,
      };
      dispatch(addToCart(data));
    }
  }

  return (
    <div className="px-4 mt-8 max-w-7xl mx-auto">
      {/* Dynamic styles injected safely for the Swiper pagination dots */}
      <style dangerouslySetInnerHTML={{ __html: swiperDarkStyles }} />

      <h2 className="text-3xl font-bold text-center mb-6 text-amber-400 dark:text-slate-100 transition-colors duration-300">
        Recently Added Books
      </h2>

      {error && (
        <p className="text-center text-red-500 my-4 dark:text-red-400">
          {error}
        </p>
      )}

      {recentlyAdded.length > 0 ? (
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-12"
        >
          {recentlyAdded.map((book) => (
            <SwiperSlide key={book._id}>
              {/* Added dark:bg-slate-800, dark:border-slate-700, and hover adjustments */}
              <div className="group relative flex flex-col bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md dark:shadow-none border border-transparent dark:border-slate-700/50 transition-all duration-300 p-2">
                <Link to={`/view-book-details/${book._id}`}>
                  {/* Note: Make sure your internal <BookCard /> component also accepts dark: classes internally if it renders text! */}
                  <BookCard data={book} />
                </Link>

                {/* Enhanced button style: shifts colors seamlessly on dark mode */}
                <button
                  onClick={() => handleAddTOCart(book)}
                  className="absolute top-4 right-4 z-10 p-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-full shadow-lg transform transition-all duration-300 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800"
                  title="Add to Cart"
                >
                  <ShoppingCart size={18} />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        !error && (
          <p className="text-center text-gray-500 dark:text-slate-400">
            No recently added books available.
          </p>
        )
      )}
    </div>
  );
};

export default RecentlyAdded;
