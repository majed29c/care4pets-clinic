"use client";
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { createUser } from "@/actions/createUser";
import { redirect } from "next/navigation";
import cookie from "js-cookie";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
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
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleScrollToTop();
    const formDataObj = new FormData(event.currentTarget);
    const response = await createUser(formDataObj);
    const data = JSON.parse(response);

    if (data.status === 200) {
      setSuccess(true);
      setMessage(data.message);
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
    <div className="relative bg-light backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20 w-[90vw] md:w-[65vw] xl:w-[50vw] mt-[4vw]">
       {message && (
                    <div className={`mb-4 p-4 pb-4 rounded-xl flex items-center space-x-3 ${success ? 'bg-background' : 'bg-red-500/20'}`}>
                      {success ? (
                        <FiCheckCircle className="text-secondary text-xl flex-shrink-0" />
                      ) : (
                        <FiAlertCircle className="text-red-500 text-xl flex-shrink-0" />
                      )}
                      <p className={`text-sm ${success ? 'text-secondary' : 'text-red-500'}`}>
                        {message}
                      </p>
                    </div>
             )}
      
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-secondary mb-2">
          Create Account
        </h2>
        <p className="text-charcoal">Join our pet care community today</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal" />
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-background rounded-lg border focus:outline-none focus:ring-2 focus:ring-secondary text-charcoal placeholder-charcoal"
              required
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-background rounded-lg border focus:outline-none focus:ring-2 focus:ring-secondary text-charcoal placeholder-charcoal"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-background rounded-lg border focus:outline-none focus:ring-2 focus:ring-secondary text-charcoal placeholder-charcoal"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-secondary py-3 rounded-lg font-semibold text-white hover:shadow-lg transition-shadow hover:bg-hovered transform hover:scale-[1.01]"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t text-charcoal"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent text-charcoal">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all flex-wrap">
            <FaGoogle className="text-red-700" />
            <span className="text-charcoal">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all flex-wrap">
            <FaFacebook className="text-blue-700" />
            <span className="text-charcoal">Facebook</span>
          </button>
        </div>
      </div>

      <p className="mt-8 text-center text-charcoal">
        Already have an account?{" "}
        <Link href="/signin" onClick={handleScrollToTop} className="text-secondary hover:text-hovered font-semibold">
          Log in
        </Link>
      </p>

    </div>
  );
}
