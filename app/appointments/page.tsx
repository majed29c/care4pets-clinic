"use client";
import React, { useState } from "react";
import { FiCheckCircle, FiAlertCircle, FiUser, FiMail, FiCalendar, FiClock, FiPlus } from "react-icons/fi";

export const services = [
  {
    title: "General Check-ups & Vaccinations",
    description: "Routine health exams and vaccinations to keep your pets healthy and prevent diseases."
  },
  {
    title: "Emergency & Surgery",
    description: "Immediate medical attention and surgical procedures, including spaying, neutering, and injury treatment."
  },
  {
    title: "Dental Care & Diagnostics",
    description: "Professional teeth cleaning, extractions, and oral health check-ups to prevent infections and maintain dental hygiene."
  },
  {
    title: "Parasite Prevention & Microchipping",
    description: "Protection against fleas, ticks, and worms, plus microchipping for permanent pet identification."
  },
  {
    title: "Bathing & Grooming",
    description: "Professional pet washing, fur trimming, and nail clipping to keep your pet clean and healthy."
  },
  {
    title: "Skin & Coat Treatments",
    description: "Specialized care for allergies, excessive shedding, and skin infections to ensure a healthy coat."
  },
  {
    title: "Ear Cleaning & Nail Trimming",
    description: "Essential hygiene services to prevent ear infections and maintain proper nail health."
  },
  {
    title: "Physical Therapy & Recovery",
    description: "Rehabilitation exercises and treatments to help pets recover from injuries or surgeries."
  },
  {
    title: "Laser Therapy & Acupuncture",
    description: "Alternative pain relief and healing methods to improve mobility and reduce discomfort."
  },
  {
    title: "Overnight Stays",
    description: "Safe and comfortable boarding options for pets when owners are away."
  },
  {
    title: "Daycare Programs",
    description: "Supervised play and socialization programs to keep pets entertained and active."
  },
  {
    title: "Pet Training Sessions",
    description: "Basic obedience, behavioral training, and problem-solving sessions to improve pet behavior."
  },
  {
    title: "Nutritional Consultations",
    description: "Expert guidance on pet diets to ensure optimal health, weight management, and overall well-being."
  },
  {
    title: "Compassionate Euthanasia",
    description: "Humane end-of-life care for aging or terminally ill pets in a comforting environment."
  },
  {
    title: "Memorial Services",
    description: "Support and options for honoring and remembering beloved pets."
  }
];


const Appointment = () => {
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    service: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleServiceSelect = (serviceTitle: string) => {
    setFormData({ ...formData, service: serviceTitle });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setTimeout(() => {
        setMessage("Appointment booked successfully!");
        setSuccess(true);
      }, 1000);
    } catch (error) {
      console.error("Error booking appointment:", error);
      setMessage("An error occurred. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <div className="relative bg-white/20 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 border-2 border-white/30 w-[90vw] sm:w-[70vw] lg:w-[50vw] mx-auto mt-8 transition-all duration-300 hover:shadow-3xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4 animate-gradient">
          Schedule Your Session
        </h2>
        <p className="text-gray-700 text-lg font-light">Let's create something amazing together</p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Service Selection */}
          <div className="space-y-4">
            <h3 className="text-gray-700 font-semibold text-lg">Select Service</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto p-2">
              {services.map((service) => (
                <div
                  key={service.title}
                  onClick={() => handleServiceSelect(service.title)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.service === service.title
                      ? "border-blue-500 bg-blue-50/20"
                      : "border-gray-300 hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <FiPlus className="mt-1 text-blue-500 flex-shrink-0" />
                    <div>
                      <h4 className="text-gray-700 font-medium">{service.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Name Input */}
          <div className="relative group">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-12 pr-6 py-4 bg-white/10 rounded-xl border-2 border-gray-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 outline-none transition-all placeholder:text-gray-700 text-gray-700"
              required
              onChange={handleChange}
              name="name"
              value={formData.name}
            />
          </div>

          {/* Email Input */}
          <div className="relative group">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-12 pr-6 py-4 bg-white/10 rounded-xl border-2 border-gray-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 outline-none transition-all placeholder:text-gray-700 text-gray-700"
              required
              onChange={handleChange}
              name="email"
              value={formData.email}
            />
          </div>

          {/* Date & Time Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Input */}
            <div className="relative group">
              <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="date"
                className="w-full pl-12 pr-6 py-4 bg-white/10 rounded-xl border-2 border-gray-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 outline-none transition-all text-gray-700"
                required
                onChange={handleChange}
                name="date"
                value={formData.date}
              />
            </div>

            {/* Time Input */}
            <div className="relative group">
              <FiClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="time"
                className="w-full pl-12 pr-6 py-4 bg-white/10 rounded-xl border-2 border-gray-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 outline-none transition-all text-gray-700"
                required
                onChange={handleChange}
                name="time"
                value={formData.time}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-4 rounded-xl font-semibold text-white hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 group overflow-hidden relative"
        >
          <span className="relative z-10">Secure Your Spot</span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity" />
        </button>
      </form>

      {/* Status Message */}
      {message && (
        <div className={`mt-6 p-4 rounded-xl flex items-center space-x-3 ${success ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          {success ? (
            <FiCheckCircle className="text-green-500 text-xl flex-shrink-0" />
          ) : (
            <FiAlertCircle className="text-red-500 text-xl flex-shrink-0" />
          )}
          <p className={`text-sm ${success ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        </div>
      )}
    </div>
  );
};

export default Appointment;