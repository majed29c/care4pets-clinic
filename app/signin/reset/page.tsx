"use client";
import { confirmpasswordcheck } from "@/actions/confirmpasswordcheck";
import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { redirect } from "next/navigation"; 
import cookie from "js-cookie";
import { form } from "framer-motion/client";
const Page = () => { 
  const [formData, setFormData] = useState({
    email: "", 
    password: "", 
    confirm_password: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formObj = new FormData(event.currentTarget);
    const response = await confirmpasswordcheck(formObj);
    const data = JSON.parse(response);
    if (data.status === 200) {
      cookie.set("email", formData.email, {expires : 3});
      redirect("/signin/reset/verification");
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="relative bg-light backdrop-blur-lg rounded-2xl shadow-xl p-8  border  mt-[4vw] w-[90vw] md:w-[65vw] xl:w-[50vw]">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold bg-clip-text text-secondary mb-2">
            Reset Password
          </h2>
          <p className="text-gray-charcoal">Fill the info below to reset your password!</p>
          
      {message && <p className="text-red-500 mt-2">{message}</p>}
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal" />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                className="w-full pl-10 pr-4 py-3 bg-background rounded-lg border focus:outline-none focus:ring-2 focus:ring-secondary text-charcoal placeholder-charcoal"
                required
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
                className="w-full pl-10 pr-4 py-3 bg-background rounded-lg border focus:outline-none focus:ring-2 focus:ring-secondary text-charcoal placeholder-charcoal"
                required
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal" />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirm_password"
                onChange={handleChange}
                value={formData.confirm_password}
                className="w-full pl-10 pr-4 py-3 bg-background rounded-lg border focus:outline-none focus:ring-2 focus:ring-secondary text-charcoal placeholder-charcoal"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-secondary hover:bg-hovered py-3 rounded-lg font-semibold text-white hover:shadow-lg transition-shadow transform hover:scale-[1.01]"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
