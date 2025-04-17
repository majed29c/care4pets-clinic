"use client";
import React, { useEffect, useState } from 'react';
import { getAppointments } from '@/actions/getAppointments';
import cookie from "js-cookie";
import { IoMdCalendar, IoMdTime, IoMdPerson, IoMdMail, IoMdConstruct } from 'react-icons/io';
import { RiArrowGoBackLine } from 'react-icons/ri';
import Link from 'next/link';

interface Appointment {
  id: string;
  date: string;
  time: string;
  name: string;
  email: string;
  service: string;
}

const BookedAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const email = cookie.get('email') as string;
        const userAppointments = await getAppointments(email);
        const data = JSON.parse(userAppointments) as { status: number; data: Appointment[] };
        
        if (data.status === 200) {
          const sortedAppointments = data.data.sort((a, b) => 
            new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime()
          );
          setAppointments(sortedAppointments);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Appointments</h1>
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <RiArrowGoBackLine className="mr-2" /> Back to Home
          </Link>
        </div>

        {appointments.length > 0 ? (
          <div className="space-y-6">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Service Section */}
                  <div className="flex items-center space-x-3">
                    <IoMdConstruct className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Service</p>
                      <p className="font-semibold text-gray-900">{appointment.service}</p>
                    </div>
                  </div>

                  {/* Date & Time Section */}
                  <div className="flex items-center space-x-3">
                    <div>
                      <IoMdCalendar className="w-6 h-6 text-green-600" />
                      <IoMdTime className="w-6 h-6 text-purple-600 mt-2" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date & Time</p>
                      <p className="font-semibold text-gray-900">{formatDate(appointment.date)}</p>
                      <p className="font-semibold text-gray-900">{appointment.time}</p>
                    </div>
                  </div>

                  {/* Client Details Section */}
                  <div className="flex items-center space-x-3">
                    <div>
                      <IoMdPerson className="w-6 h-6 text-red-600" />
                      <IoMdMail className="w-6 h-6 text-yellow-600 mt-2" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Client Details</p>
                      <p className="font-semibold text-gray-900">{appointment.name}</p>
                      <p className="text-gray-600 break-all">{appointment.email}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-4 justify-end">
                  <button className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors">
                    Cancel Appointment
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                    Reschedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-4 text-gray-400 text-6xl">📅</div>
            <h3 className="mt-2 text-xl font-medium text-gray-900">No appointments booked yet</h3>
            <p className="mt-1 text-gray-500">Schedule your first appointment to get started!</p>
            <div className="mt-6">
              <Link href="/services" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Browse Services
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookedAppointments;