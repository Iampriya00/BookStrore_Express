import { useState } from "react";
import { allBooks, deleteBook, addFav } from "@/services/authService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/auth/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { FaHeart, FaRegEdit, FaBook } from "react-icons/fa";
import { MdDelete, MdShoppingCart } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";

function AllBooks() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const { role } = useAppSelector((state) => state.auth.user || {});

  // ✅ React Query Hook
  const { data, isLoading, isFetching, error } = useQuery(
    "allbooks",
    allBooks,
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
    },
  );

  // 🔍 Check your browser console; this matches the array structure we saw!
  console.log("React Query API response:", data);

  // ✅ FIXED RESOLUTION: Your service returns the array directly
  const booksdata = Array.isArray(data) ? data : [];

  // ✅ SAFE SEARCH FILTER
  const filteredBooks = booksdata.filter((book) =>
    book?.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // ---------------- CART ----------------
  function handleAddTOCart(book) {
    if (!isLoggedIn) return navigate("/login");

    dispatch(
      addToCart({
        ...book,
        quantity: 1,
      }),
    );
  }

  // ---------------- DELETE ----------------
  async function handleDelete(bookId) {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteBook(bookId);
      // 🔥 Invalidate cache to trigger auto-refresh
      queryClient.invalidateQueries("allbooks");
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  }

  // ---------------- FAVORITE ----------------
  const handleAddToFav = async (bookid) => {
    if (!isLoggedIn) return navigate("/login");

    try {
      await addFav(bookid);
    } catch (err) {
      console.error("Error adding to favorites:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#0b1220] to-[#020617] text-white p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-yellow-400">
          <FaBook /> All Books
        </h1>

        {/* SEARCH */}
        <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 w-full md:w-80">
          <CiSearch className="text-xl text-gray-300" />
          <input
            type="search"
            placeholder="Search books..."
            className="bg-transparent outline-none w-full px-2 text-white placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* ADD BOOK BUTTON */}
        {role === "admin" && (
          <Link
            to="/addnewbook"
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-xl transition"
          >
            <IoMdAdd /> Add Book
          </Link>
        )}
      </div>

      {/* ERROR HANDLER */}
      {error && (
        <div className="text-center text-red-400 mt-10">
          Failed to load books. Please try again later.
        </div>
      )}

      {/* LOADER / NO DATA HANDLING */}
      {isLoading ? (
        <div className="text-center text-gray-300 mt-20 animate-pulse">
          Loading books...
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">No books found 📚</div>
      ) : (
        <>
          {/* FETCHING STATE INDICATOR */}
          {isFetching && (
            <p className="text-center text-sm text-gray-400 mb-4">
              Refreshing...
            </p>
          )}

          {/* BOOKS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="relative bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition duration-300"
              >
                {/* IMAGE */}
                <Link to={`/view-book-details/${book._id}`}>
                  <img
                    src={book.url}
                    alt={book.title}
                    className="w-full h-52 object-cover"
                  />
                </Link>

                {/* HEART BUTTON */}
                <button
                  onClick={() => handleAddToFav(book._id)}
                  className="absolute top-3 right-3 bg-black/50 p-2 rounded-full hover:bg-red-500 transition"
                >
                  <FaHeart className="text-white" />
                </button>

                {/* BOOK METADATA */}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-yellow-300 truncate">
                    {book.title}
                  </h3>

                  <p className="text-sm text-gray-300 mt-1">
                    Author: {book.author}
                  </p>

                  <p className="text-sm text-green-400 font-semibold mt-1">
                    ₹ {book.price}
                  </p>

                  <p className="text-xs text-gray-400 mt-2 italic">
                    {Array.isArray(book.category)
                      ? book.category.join(", ")
                      : book.category}
                  </p>

                  {/* BOTTOM CTAs */}
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => handleAddTOCart(book)}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-sm transition"
                    >
                      <MdShoppingCart /> Cart
                    </button>

                    {/* ADMIN TOOLS */}
                    {role === "admin" && (
                      <div className="flex gap-3 text-lg">
                        <Link to={`/editbook/${book._id}`}>
                          <FaRegEdit className="text-green-400 hover:scale-110 transition cursor-pointer" />
                        </Link>

                        <MdDelete
                          onClick={() => handleDelete(book._id)}
                          className="text-red-500 hover:scale-110 transition cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AllBooks;
