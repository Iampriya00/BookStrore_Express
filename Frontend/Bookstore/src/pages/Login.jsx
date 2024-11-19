import React from "react";

function Login() {
  return <>
<div className="w-[50%] m-auto pt-[20%] height[100vh]">
  <h1 className=" font-bold py-5 text-3xl">Login</h1>
  <div className="mb-6">
  <label className="block text-sm font-medium text-gray-700">Email Address</label>
  <div className="mt-1">
    <input
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      type="email"
      name="email"
      required
      placeholder="Enter your email"
    />
  </div>
  <label className="block text-sm font-medium text-gray-700">Password</label>
  <div className="mt-1">
    <input
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      type="password"
      name="password"
      required
      placeholder="Enter your password"
    />
  </div>
</div>

</div>

  </>;
}

export default Login;
