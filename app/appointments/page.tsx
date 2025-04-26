"use client";
import React, { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiUser,
  FiMail,
  FiCalendar,
  FiClock,
  FiPlus,
} from "react-icons/fi";
import { gettime } from "@/actions/gettime";
import { book } from "@/actions/book";
import BookedAppointments from "@/components/bookedappointments/BookedAppointments";
import { getInfo } from "@/actions/getInfo";
import cookie from "js-cookie";
import { services } from "./services"; // Import services

const Appointment = () => {
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    service: "",
    species: "",
  });

  useEffect(() => {
    const fetchInfo = async () => {
      const email = cookie.get("email") as string;
      try {
        const resp = await getInfo(email);
        const data = await JSON.parse(resp) as { status: number, data: { name: string } };
        if (data.status !== 200) return;
        const name = data.data.name;
        setFormData((prev) => ({ ...prev, name }));
        setFormData((prev) => ({ ...prev, email }));
      } catch (error: any) {
        console.error("Error fetching info:", error);
      }
    };
    fetchInfo();
  }, []);

  useEffect(() => {
    const fetchTime = async () => {
      if (!formData.date) return;
      const selectedDate = new Date(formData.date);
      const day = selectedDate.getDay();
      const baseTimeList = (day >= 1 && day <= 5)
        ? ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"]
        : (day === 6
          ? ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00"]
          : []);

      if (baseTimeList.length === 0) {
        setAvailableTimes([]);
        setBookedTimes([]);
        return;
      }

      try {
        const resp = await gettime(formData);
        const data = JSON.parse(resp);
        if (data.status === 200) {
          const booked = data.data.map((item: { time: string }) => item.time);
          setBookedTimes(booked);
          const filteredTimes = baseTimeList.filter((time) => !booked.includes(time));
          setAvailableTimes(filteredTimes);
        }
      } catch (err) {
        console.error("Error fetching times:", err);
        setAvailableTimes([]);
        setBookedTimes([]);
      }
    };

    fetchTime();
  }, [formData.date]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTimeSelect = (time: string) => {
    setFormData({ ...formData, time });
  };

  const handleServiceSelect = (serviceTitle: string) => {
    setFormData({ ...formData, service: serviceTitle });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    scrollToTop();
    event.preventDefault();
    try {
      const resp = await book(formData);
      const data = JSON.parse(resp);
      if (data.status !== 200) {
        setMessage("Failed to book the appointment!");
        setSuccess(false);
      } else {
        setMessage("Appointment booked successfully!");
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      setMessage("An error occurred. Please try again.");
      setSuccess(false);
    }
  };
  const scrollToTop = () => { 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <div className="relative bg-light backdrop-blur-2xl rounded-2xl shadow-2xl p-8 w-[90vw] sm:w-[70vw] lg:w-[80vw] mx-auto mt-8 transition-all duration-300 hover:shadow-3xl">
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
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-secondary mb-4 animate-gradient">
            Schedule Your Session
          </h2>
          <p className="text-charcoal text-lg font-semibold">Let's create something amazing together</p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-6">

            {/* Service Selection */}
            <div className="space-y-4 flex flex-col justify-center items-center">
              <h3 className="text-charcoal font-semibold text-lg">Select Service</h3>
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
                        <h4 className="text-charcoal font-medium">{service.title}</h4>
                        <p className="text-charcoal text-sm mt-1">{service.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Name Input */}
            <div className="relative group">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 bg-background rounded-lg border focus:outline-none focus:ring-2 focus:ring-secondary text-charcoal placeholder-charcoal"
                required
                onChange={handleChange}
                name="name"
                value={formData.name}
                readOnly
              />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 bg-background rounded-lg border focus:outline-none focus:ring-2 focus:ring-secondary text-charcoal placeholder-charcoal"
                required
                onChange={handleChange}
                name="email"
                value={formData.email}
                readOnly
              />
            </div>

            <div className="relative group">
              <select
                name="species"
                value={formData.species}
                onChange={handleChange}
                required
                className="w-full pl-4 pr-4 py-3 bg-background rounded-lg border focus:outline-none focus:ring-2 focus:ring-secondary text-charcoal"
              >
                <option value="" disabled>Select Species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Hamster">Hamster</option>
                <option value="Turtle">Turtle</option>
                <option value="Fish">Fish</option>
              </select>
            </div>

            <div className="relative group">
              <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 bg-background rounded-lg border focus:outline-none focus:ring-2 focus:ring-secondary text-charcoal placeholder-charcoal"
                required
                onChange={handleChange}
                name="date"
                value={formData.date}
                min={new Date().toISOString().split("T")[0]} // Restrict past dates
              />
            </div>

            {formData.date && availableTimes.length > 0 && (
              <div>
                <h3 className="text-charcoal font-semibold text-lg">Select Time</h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {availableTimes.map((time) => {
                    const isSelected = formData.time === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => handleTimeSelect(time)}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${
                          isSelected ? "border-secondary bg-blue-50/20" : "border-gray-300 hover:border-secondary"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            onClick={scrollToTop}
            className="w-full bg-secondary hover:bg-hovered py-4 rounded-xl font-semibold text-white hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 group overflow-hidden relative"
          >
            <span className="relative z-10">Secure Your Spot</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>
        </form>

      </div>

      <BookedAppointments />
    </>
  );
};

export default Appointment;
