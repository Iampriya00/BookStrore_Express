import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginservice } from "@/services/authService";
import { useAppSelector } from "@/store/hooks";
function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = useAppSelector((state) => state.auth.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email.trim() || !password.trim()) {
      alert("Please fill in all the fields");
      return;
    }

    await loginservice(values);
  };
  useEffect(() => {
    if (isLoggedIn && token) {
      navigate("/profile");
    }
  }, [isLoggedIn]);
  return (
    <div className="w-[50%] m-auto pt-[10%] h-[80vh]">
      <h1 className="font-bold py-5 text-3xl">Login</h1>
      <form onSubmit={handleSubmit}>
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
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Password
          </label>
          <div className="mt-1">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-zinc-800 text-white px-4 py-2 rounded transition"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
