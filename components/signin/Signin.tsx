"use client";
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { login } from "../../actions/login";
import { redirect } from "next/navigation";
import cookie from "js-cookie";
const Signin = () => {
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
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
    const response = await login(formDataObj);
    const data = JSON.parse(response);

    if (data.status === 200) {
      setMessage("Login successful");
      setSuccess(true);
      cookie.set("isLoggedIn",'true', { expires: 1 });
      redirect("/"); 
    } else {
      setMessage("Invalid credentials");
      setSuccess(false);
    }
  } 

  return (
    <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20 w-[90vw] md:w-[65vw] xl:w-[50vw] mt-[4vw]">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-800">Sign in to manage your pet's care</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-700"
              required
              onChange={handleChange}
              name="email"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-700"
              required
              onChange={handleChange}
              name="password"
            />
          </div>
        </div>

        <div className="flex md:items-center md:justify-between flex-col  md:flex-row xs:space-y-2 md:space-y-0">
          <label className="flex items-center space-x-2 text-gray-700 px-3">
            <input
              type="checkbox"
              className="rounded bg-white/10 border-white/20 focus:ring-blue-400 "
            />
            <span className="text-sm">Remember me</span>
          </label>
          <Link href="/signin/reset" className="text-sm pl-3 text-blue-400 hover:text-blue-300">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-3 rounded-lg font-semibold text-white hover:shadow-lg transition-shadow transform hover:scale-[1.01]"
        >
          Sign In
        </button>
      </form>

      {/* Social Login */}
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent text-gray-700">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all">
            <FaGoogle className="text-red-400" />
            <span className="text-gray-700">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all">
            <FaFacebook className="text-blue-700" />
            <span className="text-gray-700">Facebook</span>
          </button>
        </div>
      </div>

      <p className="mt-8 text-center text-gray-700">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-semibold">
          Sign Up
        </Link>
      </p>
      
      {message && success && <p className="mt-4 text-center text-green-400">{message}</p>}
      {message && !success && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default Signin;
