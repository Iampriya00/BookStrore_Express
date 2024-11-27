import { useAppSelector } from "@/store/hooks";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="bg-zinc-700 flex h-[80vh]">
      <div className="text-white">{JSON.stringify(user)}</div>
    </div>
  );
}

export default Profile;
