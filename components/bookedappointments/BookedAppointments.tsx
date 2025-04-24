"use client";
import React, { useEffect, useState } from 'react';
import { getAppointments } from '@/actions/getAppointments';
import cookie from "js-cookie";
import {
  IoMdCalendar,
  IoMdTime,
  IoMdPerson,
  IoMdMail,
  IoMdConstruct,
} from 'react-icons/io';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { FaPaw } from 'react-icons/fa';
import Link from 'next/link';
import cancel from "@/actions/cancel";

interface Appointment {
  id: string;
  date: string;
  time: string;
  name: string;
  email: string;
  service: string;
  species: string;
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
          const sortedAppointments = data.data.sort(
            (a, b) =>
              new Date(`${a.date}T${a.time}`).getTime() -
              new Date(`${b.date}T${b.time}`).getTime()
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
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    const resp = await cancel(appointmentId);
    if (!resp) {
      console.log("Error cancelling appointment");
      return;
    }
    const data = JSON.parse(resp) as { status: number; message: string };
    if (data.status === 200) {
      setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
      console.log("Appointment cancelled successfully", data.message);
    } else {
      console.log("Error cancelling appointment", data.message);
    }
  };

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <section className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Appointments</h1>
          <Link href="/" className="flex items-center text-secondary hover:text-hovered">
            <RiArrowGoBackLine className="mr-2" /> Back to Home
          </Link>
        </header>

        {appointments.length > 0 ? (
          <section className="space-y-6">
            {appointments.map((appointment) => (
              <article
                key={appointment.id}
                className="bg-light rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Service */}
                  <div className="flex items-center space-x-3">
                    <IoMdConstruct className="w-6 h-6 text-secondary" />
                    <div>
                      <p className="text-sm font-medium text-charcoal">Service</p>
                      <p className="font-semibold text-charcoal">{appointment.service}</p>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-center space-x-3">
                    <div>
                      <IoMdCalendar className="w-6 h-6 text-secondary" />
                      <IoMdTime className="w-6 h-6 text-secondary mt-2" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-charcoal">Date & Time</p>
                      <p className="font-semibold text-charcoal">{formatDate(appointment.date)}</p>
                      <p className="font-semibold text-charcoal">{appointment.time}</p>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center space-x-3">
                    <div>
                      <IoMdPerson className="w-6 h-6 text-secondary" />
                      <IoMdMail className="w-6 h-6 text-secondary mt-2" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-charcoal">Client</p>
                      <p className="font-semibold text-charcoal">{appointment.name}</p>
                      <p className="text-charcoal break-all">{appointment.email}</p>
                    </div>
                  </div>

                  {/* Species */}
                  <div className="flex items-center space-x-3">
                    <FaPaw className="w-6 h-6 text-secondary" />
                    <div>
                      <p className="text-sm font-medium text-charcoal">Species</p>
                      <p className="font-semibold text-charcoal">{appointment.species}</p>
                    </div>
                  </div>
                </div>

                <footer className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    onClick={() => handleCancelAppointment(appointment.id)}
                  >
                    Cancel Appointment
                  </button>
                </footer>
              </article>
            ))}
          </section>
        ) : (
          <section className="text-center py-12">
            <div className="mb-4 text-charcoal text-6xl">📅</div>
            <h3 className="mt-2 text-xl font-medium text-gray-900">
              No appointments booked yet
            </h3>
            <p className="mt-1 text-charcoal">
              Schedule your first appointment to get started!
            </p>
            <div className="mt-6">
              <Link
                href="/services"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-hovered"
              >
                Browse Services
              </Link>
            </div>
          </section>
        )}
      </section>
    </main>
  );
};

export default BookedAppointments;