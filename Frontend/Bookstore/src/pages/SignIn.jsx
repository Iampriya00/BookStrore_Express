import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function SignIn() {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const change = (e) => {
    setValues({ ...Values, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const { username, email, password, address, phone } = Values;

    try {
      if (!username || !email || !password || !address || !phone) {
        alert("Please fill all the fields");
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/v1/signup",
          Values
        );
        alert("Server Response: " + response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during sign-in.");
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-500 rounded-lg shadow-md p-8">
        <h1 className="text-zinc-200 text-xl mb-6">Sign In</h1>
        <form onSubmit={submit}>
          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="text-zinc-400">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
              placeholder="Username"
              name="username"
              onChange={change}
              value={Values.username}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="text-zinc-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
              placeholder="Email"
              name="email"
              onChange={change}
              value={Values.email}
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label htmlFor="password" className="text-zinc-400">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded pr-10"
              placeholder="Password"
              name="password"
              onChange={change}
              value={Values.password}
            />
            {/* Toggle Password Visibility */}
            <span
              className="absolute right-3 top-14 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="address" className="text-zinc-400">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
              placeholder="Address"
              name="address"
              onChange={change}
              value={Values.address}
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label htmlFor="phone" className="text-zinc-400">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
              placeholder="Phone"
              name="phone"
              onChange={change}
              value={Values.phone}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-zinc-800 text-white px-4 py-2 rounded transition hover:bg-zinc-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
