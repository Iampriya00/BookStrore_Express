import { useAppSelector } from "@/store/hooks";
import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Profile/sidebar";
import { userInformation } from "@/services/authService";

function Profile() {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

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

  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="bg-zinc-700 flex h-[80vh]">
      <div className="text-white">
        <Sidebar />
        {JSON.stringify(user)}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
