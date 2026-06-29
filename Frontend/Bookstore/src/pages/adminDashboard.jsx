import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import Sidebar from "../components/Profile/sidebar";
import { userInformation } from "@/services/authService";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
function Profile() {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const user = useAppSelector((state) => state.auth.user);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Fetch user information
  useEffect(() => {
    userInformation();
  }, []);

  return (
    <div className="flex h-screen bg-zinc-950">
      <Sidebar />

      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-gradient-to-br from-black/80 via-zinc-900 to-black/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/10">
          <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 mb-8 border-b pb-4">
            User Profile
          </h1>

          {user ? (
            <div className="flex flex-col md:flex-row items-center gap-10">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={user.avatar || ""}
                  alt="User Avatar"
                  className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-indigo-500 shadow-xl object-cover"
                />
              </div>

              {/* Details */}
              <div className="space-y-4 text-center md:text-left">
                <p className="flex items-center gap-3 text-gray-100 text-lg font-semibold">
                  <FaUser className="text-indigo-500" />
                  Name:
                  <span className="font-normal text-orange-300">
                    {user.username}
                  </span>
                </p>

                <p className="flex items-center gap-3 text-gray-100 text-lg font-semibold">
                  <FaEnvelope className="text-pink-500" />
                  Email:
                  <span className="font-normal text-orange-300">
                    {user.email}
                  </span>
                </p>

                <p className="flex items-center gap-3 text-gray-100 text-lg font-semibold">
                  <FaPhone className="text-green-500" />
                  Phone:
                  <span className="font-normal text-orange-300">
                    {user.phone || "N/A"}
                  </span>
                </p>

                <p className="flex items-center gap-3 text-gray-100 text-lg font-semibold">
                  <FaMapMarkerAlt className="text-orange-500" />
                  Address:
                  <span className="font-normal text-orange-300">
                    {user.address || "N/A"}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              Loading user information...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
