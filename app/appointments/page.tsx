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
export const services = [
  { title: "General Check-ups & Vaccinations", description: "Routine health exams and vaccinations." },
  { title: "Emergency & Surgery", description: "Immediate medical attention and surgical procedures." },
  { title: "Dental Care & Diagnostics", description: "Professional teeth cleaning, extractions, and oral health check-ups." },
  { title: "Parasite Prevention & Microchipping", description: "Protection against fleas, ticks, and worms." },
  { title: "Bathing & Grooming", description: "Professional pet washing, fur trimming, and nail clipping." },
  { title: "Skin & Coat Treatments", description: "Specialized care for allergies, excessive shedding, and skin infections." },
  { title: "Ear Cleaning & Nail Trimming", description: "Essential hygiene services to prevent ear infections." },
  { title: "Physical Therapy & Recovery", description: "Rehabilitation exercises and treatments for pets." },
  { title: "Laser Therapy & Acupuncture", description: "Alternative pain relief and healing methods." },
  { title: "Overnight Stays", description: "Safe boarding options for pets." },
  { title: "Daycare Programs", description: "Supervised play and socialization programs." },
  { title: "Pet Training Sessions", description: "Basic obedience, behavioral training, and problem-solving sessions." },
  { title: "Nutritional Consultations", description: "Expert guidance on pet diets to ensure optimal health." },
  { title: "Compassionate Euthanasia", description: "Humane end-of-life care for aging or terminally ill pets." },
  { title: "Memorial Services", description: "Support and options for honoring and remembering pets." }
];
import { getInfo } from "@/actions/getInfo";
import cookie from "js-cookie";
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
  });
  useEffect(() => {
    const fetchInfo = async () => {
        const email = cookie.get("email") as string;
        try{
          
        const resp = await getInfo(email);
        const data = await JSON.parse(resp) as {status:number, data:{name:string}};
         if(data.status!==200){
          return;
         }
         const name= data.data.name;
         setFormData((prev) => ({ ...prev, name }));
         setFormData((prev) => ({ ...prev, email }));
        }catch(error: any){
          console.error("Error fetching info:", error);
          return;
        }
        
    }
    fetchInfo();

  }
  ,[]); 

  useEffect(() => {
    const fetchTime = async () => {
      if (!formData.date) return;

      const selectedDate = new Date(formData.date);
      const day = selectedDate.getDay();
      const baseTimeList = (day >= 1 && day <= 5)
        ? ["8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"]
        : (day === 6
          ? ["9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00"]
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      setMessage("An error occurred. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <>
    <div className="relative bg-white/20 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 border-2 border-white/30 w-[90vw] sm:w-[70vw] lg:w-[50vw] mx-auto mt-8 transition-all duration-300 hover:shadow-3xl">
      <div className="text-center mb-10">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4 animate-gradient">
          Schedule Your Session
        </h2>
        <p className="text-gray-700 text-lg font-light">Let's create something amazing together</p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-4 flex flex-col justify-center items-center">
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
              readOnly
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
              readOnly
            />
          </div>

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

          {formData.date && availableTimes.length > 0 && (
            <div>
              <h3 className="text-gray-700 font-semibold text-lg">Select Time</h3>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {availableTimes.map((time) => {
                  const isSelected = formData.time === time;

                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleTimeSelect(time)}
                      className={`p-3 rounded-xl border-2 text-center transition-all
                        ${isSelected ? "border-blue-500 bg-blue-50/20" :
                          "border-gray-300 hover:border-blue-300 cursor-pointer"
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
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-4 rounded-xl font-semibold text-white hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 group overflow-hidden relative"
        >
          <span className="relative z-10">Secure Your Spot</span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity" />
        </button>
      </form>

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
    <BookedAppointments />
   </>
  );
};

export default Appointment;
