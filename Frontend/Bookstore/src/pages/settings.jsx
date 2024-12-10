import { editUserDetails } from "@/services/authService";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "@/store/hooks";
import { Link } from "react-router-dom";

function Settings() {
  const user = useAppSelector((state) => state.auth.user);

  // Define form validation schema using zod
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name is required.",
    }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Invalid email format",
    }),
    phone: z.string().min(1, { message: "Phone number is required" }),

    address: z.string().min(5, { message: "Address is required" }),
    image: z
      .string()
      .url({ message: "Invalid image URL" })
      .min(1, { message: "Image URL is required" }),
  });

  // Initialize the form with default values based on user data
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      image: user?.avatar || "",
      address: user?.address || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        image: user.avatar,
      });
    }
  }, [user, form]);

  // Handle form submission
  const handleSubmit = async (data) => {
    // console.log(data);

    // Send the updated user data to the backend
    await editUserDetails({
      avatar: data.image,
      username: data.name,
      address: data.address,
      phone: data.phone,
    });
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-6">
        <ul className="space-y-4">
          <li>
            <Link
              to="/profile"
              className="block text-white hover:text-gray-300"
            >
              Profile Overview
            </Link>
          </li>
          <li>
            <Link to="/orders" className="block text-white hover:text-gray-300">
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="block text-white hover:text-gray-300"
            >
              Account Settings
            </Link>
          </li>
        </ul>
      </div>

      {/* Edit Profile Form */}
      <div className="w-3/4 p-6">
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Edit Profile
          </h2>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...form.register("name")}
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                {...form.register("address")}
                placeholder="Enter your address"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                disabled
                type="email"
                id="email"
                {...form.register("email")}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                {...form.register("phone")}
                placeholder="Enter your phone number"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image URL
              </label>
              <input
                type="text"
                id="image"
                {...form.register("image")}
                placeholder="Enter image URL"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;
