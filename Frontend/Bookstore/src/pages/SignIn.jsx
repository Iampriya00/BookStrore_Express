import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FaUser, FaEnvelope, FaLock, FaHome, FaPhone } from "react-icons/fa";

function SignIn() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const change = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    const { username, email, password, address, phone } = values;

    if (!username || !email || !password || !address || !phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/signup",
        values,
      );

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <div className="w-full max-w-md bg-gray-900/70 border border-gray-700 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={submit} className="space-y-4">
          {/* Username */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={values.username}
              onChange={change}
              className="w-full pl-10 pr-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={change}
              className="w-full pl-10 pr-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={change}
              className="w-full pl-10 pr-10 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            {/* Eye Icon */}
            <span
              className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>

          {/* Address */}
          <div className="relative">
            <FaHome className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={values.address}
              onChange={change}
              className="w-full pl-10 pr-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <FaPhone className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={values.phone}
              onChange={change}
              className="w-full pl-10 pr-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-lg"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
