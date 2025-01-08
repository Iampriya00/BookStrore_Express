import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import Sidebar from "../components/Profile/sidebar";
import { userInformation } from "@/services/authService";

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
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 bg-gray-800 text-white p-6">
        <Sidebar />
      </div>
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
            User Profile
          </h1>

          {user ? (
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* User Avatar */}
              <div className="relative">
                <img
                  src={user.avatar || ""}
                  alt="User Avatar"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-indigo-500 shadow-lg"
                />
              </div>

              {/* User Details */}
              <div className="text-center md:text-left">
                <p className="text-gray-600 text-xl italic font-bold">
                  Name:{" "}
                  <span className="font-medium ms-2">{user.username}</span>
                </p>
                <p className="text-gray-600 italic text-xl font-bold">
                  Email: <span className="font-medium ms-2">{user.email}</span>
                </p>
                <p className="text-gray-600 text-xl italic font-bold">
                  Phone:{" "}
                  <span className="font-medium ms-2">
                    {user.phone || "N/A"}
                  </span>
                </p>
                <p className="text-gray-600 text-xl italic font-bold">
                  Address:{" "}
                  <span className="font-medium ms-2">
                    {user.address || "N/A"}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-center">
              Loading user information...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
