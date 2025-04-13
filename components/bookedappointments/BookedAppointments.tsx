"use client";
import React, { useEffect, useState } from 'react';
import { getAppointments } from '@/actions/getAppointments';
import cookie from "js-cookie";
import { IoMdReturnLeft } from 'react-icons/io';

const BookedAppointments = () => {
  interface Appointment {
    id: string;
    date: string;
    time: string;
    name: string;
    email: string;
    service: string;
  }
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const email = cookie.get('email') as string;
        const userAppointments = await getAppointments(email);
        const data = JSON.parse(userAppointments) as { status: number; data: Appointment[] };
        if (data.status !== 200 || !data.data) {
          console.warn("No appointments or failed to fetch.");
          return;
        }
        const appointment = data.data.map((appointment: any) => {
          return {
            id: appointment.id,
            date: appointment.date,
            time: appointment.time,
            name: appointment.name,
            email: appointment.email,
            service: appointment.service
          };
        });
        
        setAppointments(appointment);

      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className='w-full h-auto flex flex-col justify-center items-center text-center mt-28'>
      <div className='w-[80%] h-auto bg-white shadow-md rounded-md p-4 m-4'>
        <div className='text-gray-700 font-semibold text-lg mb-4'>
          Booked Appointments
        </div>

        {appointments.length > 0 ? (
          appointments.map((appointment: any, index) => (
            <div key={index} className='border-b py-2 text-left'>
              <p><strong>Service:</strong> {appointment.service}</p>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
              <p><strong>Name:</strong> {appointment.name}</p>
              <p><strong>Email:</strong> {appointment.email}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No appointments booked yet.</p>
        )}
      </div>
    </div>
  );
};

export default BookedAppointments;
