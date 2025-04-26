"use client";
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { login } from "../../actions/login";
import { redirect } from "next/navigation";
import cookie from "js-cookie";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

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

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleScrollToTop();
    const formDataObj = new FormData(event.currentTarget);
    const response = await login(formDataObj);
    const data = JSON.parse(response);

    if (data.status === 200) {
      setMessage("Login successful");
      setSuccess(true);
      cookie.set("email", formData.email, { expires: 1 });
      cookie.set("isLoggedIn", "true", { expires: 1 });
      setTimeout(() => {
       
        redirect("/");
      }, 1000);
    } else {
      setMessage("Invalid credentials");
      setSuccess(false);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="relative bg-light backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20 w-[90vw] md:w-[65vw] xl:w-[50vw] mt-[4vw]">
        {message && (
          <div
            className={`mb-4 p-4 pb-4 rounded-xl flex items-center space-x-3 ${
              success ? "bg-background" : "bg-red-500/20"
            }`}
          >
            {success ? (
              <FiCheckCircle className="text-secondary text-xl flex-shrink-0" />
            ) : (
              <FiAlertCircle className="text-red-500 text-xl flex-shrink-0" />
            )}
            <p className={`text-sm ${success ? "text-secondary" : "text-red-500"}`}>
              {message}
            </p>
          </div>
        )}

        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold bg-clip-text text-secondary">
            Welcome Back
          </h2>
          <p className="text-charcoal">Sign in to manage your pet's care</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 bg-background rounded-lg border focus:outline-none focus:ring-2 focus:ring-secondary text-charcoal placeholder-charcoal"
                required
                onChange={handleChange}
                name="email"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-background rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-secondary text-charcoal placeholder-charcoal"
                required
                onChange={handleChange}
                name="password"
              />
            </div>
          </div>

          <div className="flex md:items-center md:justify-between flex-col  md:flex-row xs:space-y-2 md:space-y-0">
            <label className="flex items-center space-x-2 text-charcoal px-3">
              <input type="checkbox" className="rounded focus:ring-secondary " />
              <span className="text-sm text-charcoal">Remember me</span>
            </label>
            <Link href="/signin/reset" onClick={handleScrollToTop} className="text-sm pl-3 text-secondary hover:text-hovered">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-secondary py-3 rounded-lg font-semibold text-white hover:shadow-lg hover:bg-hovered transition-shadow transform hover:scale-[1.01]"
          >
            Sign In
          </button>
        </form>
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-charcoal">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all">
              <FaGoogle className="text-red-700" />
              <span className="text-charcoal">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all">
              <FaFacebook className="text-blue-700" />
              <span className="text-charcoal">Facebook</span>
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-charcoal">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-secondary hover:text-hovered font-semibold"
            onClick={handleScrollToTop}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
