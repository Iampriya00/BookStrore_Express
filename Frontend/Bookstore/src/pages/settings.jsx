import { editUserDetails } from "@/services/authService";
import { editUser } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function Settings() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  // Define form validation schema using zod
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name is required.",
    }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Invalid email format",
    }),
    phone: z
      .string()
      .min(1, { message: "Phone number is required" })
      .regex(/^\+?[1-9]\d{1,14}$/, {
        message: "Invalid phone number format",
      }),
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the updated user data to the backend
      const updatedUser = await editUserDetails({
        username: user.username,
        address: user.address,
        phone: user.phone,
        image: user.avatar,
        email: user.email,
      });

      // Dispatch the updated user data to Redux store
      dispatch(editUser(updatedUser));

      // Provide feedback to the user
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user details", error);
      alert("Error updating user details");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            htmlFor="name"
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
  );
}

export default Settings;
