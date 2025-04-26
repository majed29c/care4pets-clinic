"use client";
import { useState, useRef, useEffect } from "react";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { verify } from "@/actions/verify";
import cookie from "js-cookie";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
const Page = () => {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (/^\d$/.test(value)) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      if (index < 5) {
        inputs.current[index + 1]?.focus();
      } else {
        inputs.current[index]?.blur(); // optional
      }
    }
  };
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }


  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    const newDigits = [...digits];
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        newDigits[index - 1] = "";
        setDigits(newDigits);
        inputs.current[index - 1]?.focus();
      } else {
        newDigits[index] = "";
        setDigits(newDigits);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    handleScrollToTop();
    const paste = e.clipboardData.getData("text").slice(0, 6);
    const newDigits = paste.split("").filter((c) => /\d/.test(c));
    const filled = [...newDigits, ...Array(6 - newDigits.length).fill("")];
    setDigits(filled);

    // Focus last input (optional UX polish)
    if (newDigits.length > 0) {
      const lastIndex = Math.min(newDigits.length - 1, 5);
      inputs.current[lastIndex]?.focus();
    }

    // Trigger submit if filled
    if (newDigits.length === 6) {
      handleSubmit(filled);
    }
  };

  useEffect(() => {
    if (digits.every((d) => d !== "") && !submitting) {
      handleSubmit(digits);
    }
  }, [digits]);

  const handleSubmit = async (inputDigits?: string[]) => {
    handleScrollToTop();
    const currentDigits = inputDigits || digits;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (submitting) return; // Prevent double submission

    const email = cookie.get("email");
    if (!email) return setMessage("Email not found");

    if (currentDigits.some((d) => d === "")) {
      return setMessage("Please enter all 6 digits.");
    }

    setSubmitting(true);
    setMessage("");

    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("digits", currentDigits.join(""));

    const response = await verify(formdata);
    setSubmitting(false);

    if (response) {
      const data = JSON.parse(response);
      if (data.status === 200) {
        setMessage(data.message);
        setSuccess(true);
        cookie.set("isLoggedIn", "true", { expires: 1 });
        setTimeout(() => redirect("/"), 2000);
      } else {
        setMessage(data.message);
        setSuccess(false);
      }
    } else {
      setMessage("Something went wrong");
      setSuccess(false);
    }
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="relative bg-light backdrop-blur-lg rounded-2xl shadow-xl p-8 w-[90vw] md:w-[65vw]  lg:w-[50vw] border border-white/20 mt-[4vw]">
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
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold bg-clip-text text-secondary mb-2">
            Reset Password
          </h2>
          <p className="text-charcoal">
            Please enter your 6-digit verification code
          </p>
          
          

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="flex justify-center space-x-3 lg:space-x-2 pt-20 pb-20 gap-0 lg:gap-3">
              {digits.map((digit, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    ref={(el) => {
                      inputs.current[index] = el;
                    }}
                    type="number"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 text-2xl lg:text-3xl text-center bg-background backdrop-blur-sm rounded-md  lg:rounded-xl border-2 border-secondary focus:border-secondary focus:ring-2 outline-none transition-all text-charcoal font-bold"
                    autoFocus={index === 0}
                    aria-label={`Digit input ${index + 1}`}
                  />
                </motion.div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-secondary hover:bg-hovered mt-6 py-3 rounded-lg font-semibold text-white hover:shadow-lg transition-shadow transform hover:scale-[1.01] disabled:opacity-60"
              onClick={() => handleSubmit()}
              disabled={submitting}
            >
              {submitting ? "Verifying..." : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
