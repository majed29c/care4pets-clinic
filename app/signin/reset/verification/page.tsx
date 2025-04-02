"use client";
import { useState, useRef } from "react";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { verify } from "@/actions/verify";
import cookie from "js-cookie";
import { useEffect } from "react";
const Page = () => {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [message, setMessage] = useState("");
  const [success,setSuccess] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (/^\d$/.test(value)) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);
      if (index < 5 && value) inputs.current[index + 1]?.focus();
      if (newDigits.every((d) => d !== "")) handleSubmit(); 
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      const newDigits = [...digits];
      if (!digits[index] && index > 0) {
        newDigits[index - 1] = "";
        inputs.current[index - 1]?.focus();
      } else {
        newDigits[index] = "";
      }
      setDigits(newDigits);
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const paste = e.clipboardData.getData("text").slice(0, 6);
      const newDigits = paste.split("").filter((c) => /\d/.test(c));
  
      setDigits([...newDigits, ...Array(6 - newDigits.length).fill("")]);
    };
  
    useEffect(() => {
      if (digits.every((d) => d !== "")) {
        handleSubmit();
      }
    }, [digits]);

  const handleSubmit = async () => {
    const email = cookie.get("email");
    if (!email) return setMessage("Email not found");
    
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("digits", digits.join(""));

    const response = await verify(formdata);
    if (response) {
      const data = JSON.parse(response);
      if(data.status == 200){
        setMessage(data.message);
        setSuccess(true);
        cookie.set("isLoggedIn", "true", { expires: 1 });
        setTimeout(() => redirect("/"), 2000);
      }else{
        setMessage(data.message);
        setSuccess(false);
      }
    
    } else {
      setMessage("Something went wrong");
    }
  };

  
  return (
    <div className="flex w-full justify-center items-center">
      <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-[65vw] lg:w-[50vw] border border-white/20 mt-[4vw]">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            Reset Password
          </h2>
          <p className="text-gray-800">Please enter your 6-digit verification code</p>
          {message && !success && <p className="text-red-500 text-sm text-center">{message}</p>}
          {message && success && <p className="text-green-500 text-sm text-center">{message}</p>}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="flex justify-center space-x-2 lg:space-x-2 pt-20 pb-20 gap-0 lg:gap-3">
              {digits.map((digit, index) => (
                <motion.div key={index} initial={{ scale: 1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <input
                    ref={(el) => {
                      inputs.current[index] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-8 h-8 lg:w-12 lg:h-12 xl:w-14 xl:h-14 text-2xl lg:text-3xl text-center bg-gray-200 backdrop-blur-sm rounded-md border-gray-700  lg:rounded-xl border-2 lg:border-white/30 focus:border-blue-400 focus:ring-2 outline-none transition-all text-gray-700 font-bold"
                    autoFocus={index === 0}
                    aria-label={`Digit input ${index + 1}`}
                  />
                </motion.div>
              ))}
            </div>
           
            <button
              type="submit"
              className="w-full bg-gradient-to-r mt-6 from-blue-500 to-purple-600 py-3 rounded-lg font-semibold text-white hover:shadow-lg transition-shadow transform hover:scale-[1.01]"
              onClick={handleSubmit} 
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
