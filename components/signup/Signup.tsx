"use client";
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { createUser } from "@/actions/auth"; 
import {redirect} from "next/navigation"; 
import cookie from "js-cookie";
export default function Signup() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formDataObj = new FormData(event.currentTarget);
    
    const response = await createUser(formDataObj);
    const data = JSON.parse(response);

    if (data.status === 200) {
      setTimeout(() => {
        cookie.set("email", formData.email);
        redirect("/signup/verification");
      }, 2000);
    } else {
      setMessage(data.message); 
      setSuccess(false);
    }
  }

  return (
    <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-[90vw] md:w-[65vw]xl:w-[50vw] border border-white/20 mt-[4vw]">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
          Create Account
        </h2>
        <p className="text-gray-800">Join our pet care community today</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit} action="POST">
        <div className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}  // Bind value to state
              onChange={handleChange} // Use the handleChange function
              className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-600"
              required
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}  // Bind value to state
              onChange={handleChange} // Use the handleChange function
              className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-600"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}  // Bind value to state
              onChange={handleChange} // Use the handleChange function
              className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-600"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-3 rounded-lg font-semibold text-white hover:shadow-lg transition-shadow transform hover:scale-[1.01]"
        >
          Sign Up
        </button>
      </form>

      {/* Social Login */}
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent text-gray-600">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all flex-wrap">
            <FaGoogle className="text-red-400" />
            <span className="text-gray-600">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all flex-wrap">
            <FaFacebook className="text-blue-700" />
            <span className="text-gray-500">Facebook</span>
          </button>
        </div>
      </div>

      <p className="mt-8 text-center text-gray-600">
        Already have an account?{" "}
        <Link href="/signin" className="text-blue-400 hover:text-blue-300 font-semibold">
          Log in
        </Link>
      </p>

      {message && success && <p className="mt-4 text-center text-green-400">{message}</p>}
      {message && !success && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
}
