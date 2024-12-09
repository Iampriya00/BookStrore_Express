import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
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
    const getUserInfo = async () => {
      try {
        await userInformation();
      } catch (error) {
        console.error(
          "Error in useEffect while fetching user info:",
          error.message
        );
      }
    };
    getUserInfo();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-6">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-4">User Profile</h1>

          {user ? (
            <div className="flex gap-6">
              {/* User Avatar */}
              <div>
                <img
                  src={user.avatar || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full border border-gray-300"
                />
              </div>

              {/* User Details */}
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">Email: {user.email}</p>
                <p className="text-gray-600">Username: {user.username}</p>
                <p className="text-gray-600">Phone: {user.phone || "N/A"}</p>
                <p className="text-gray-600">Address:{user.address}</p>
              </div>
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
        </div>

        {/* Outlet for nested routes */}
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Profile;
