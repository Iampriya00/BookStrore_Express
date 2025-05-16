import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginservice } from "@/services/authService";
import { useAppSelector } from "@/store/hooks";
import { useMutation } from "react-query";
import { Button } from "@/components/ui/button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);

  const { mutateAsync: loginMutation, isLoading } = useMutation(loginservice);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;

    if (!email.trim() || !password.trim()) {
      alert("Please fill in all the fields");
      return;
    }

    try {
      await loginMutation(values);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  useEffect(() => {
    if (isLoggedIn && token) {
      if (user?.role === "admin") {
        navigate("/adminDashboard");
      } else {
        navigate("/profile");
      }
    }
  }, [isLoggedIn, token, user, navigate]);

  return (
    <div className="w-[50%] m-auto pt-[10%] h-screen">
      <h1 className="font-bold py-5 text-3xl">Login</h1>
      <form onSubmit={handleSubmit} className="bg-[#cccccc36] p-8 rounded-lg">
        {/* Email Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="mt-1">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Password
          </label>
          <div className="relative mt-1">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              required
            />
            {showPassword ? (
              <FaRegEyeSlash
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <FaRegEye
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mt-4">
            <Link to="/signin" className="text-blue-500 hover:underline">
              New User?
            </Link>
            <Link
              to="/forgotPassword"
              className="text-gray-500 cursor-pointer hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <Button
            type="submit"
            loading={isLoading}
            className="bg-zinc-800 text-white px-4 py-2 rounded transition hover:bg-zinc-700"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
