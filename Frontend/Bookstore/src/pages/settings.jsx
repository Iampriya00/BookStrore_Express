import { editUserDetails } from "@/services/authService";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "@/store/hooks";
import { Link } from "react-router-dom";
import Sidebar from "../components/Profile/sidebar";
import {
  FaUser,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaImage,
} from "react-icons/fa";
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

  // Handle form submission
  const handleSubmit = async (data) => {
    console.log(data);

    await editUserDetails({
      avatar: data.image,
      username: data.name,
      address: data.address,
      phone: data.phone,
    });
  };
  return (
    <div className="flex h-screen  bg-zinc-950">
      <Sidebar />

      <div className="w-full mx-auto p-8 text-white shadow-2xl rounded-3xl border border-white/10">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          ✨ Edit Profile
        </h2>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-1">
              <FaUser className="text-indigo-400" /> Name
            </label>
            <input
              type="text"
              id="name"
              {...form.register("name")}
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-zinc-900 text-gray-100 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Address */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-1">
              <FaMapMarkerAlt className="text-purple-400" /> Address
            </label>
            <input
              type="text"
              id="address"
              {...form.register("address")}
              placeholder="Enter your address"
              className="w-full px-4 py-3 bg-zinc-900 text-gray-100 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-1">
              <FaEnvelope className="text-pink-400" /> Email
            </label>
            <input
              disabled
              type="email"
              id="email"
              {...form.register("email")}
              className="w-full px-4 py-3 bg-zinc-800 text-gray-400 border border-white/10 rounded-xl cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-1">
              <FaPhone className="text-green-400" /> Phone
            </label>
            <input
              type="text"
              id="phone"
              {...form.register("phone")}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 bg-zinc-900 text-gray-100 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* Image */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-1">
              <FaImage className="text-yellow-400" /> Image URL
            </label>
            <input
              type="text"
              id="image"
              {...form.register("image")}
              placeholder="Enter image URL"
              className="w-full px-4 py-3 bg-zinc-900 text-gray-100 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition"
          >
            💾 Save Changes
          </button>
        </form>
      </div>
      {/* Edit Profile Form */}
    </div>
  );
}

export default Settings;
