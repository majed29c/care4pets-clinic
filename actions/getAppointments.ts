"use server";
import {db} from "@/lib/firebase";
import {collection , query, where, getDocs, deleteDoc} from "firebase/firestore";
export async function getAppointments(email: string) {
    const appointmentRef = collection(db, "appointments");
    try {
      const appointment = await getDocs(query(appointmentRef, where("email", "==", email)));
      if (appointment.empty) {
        return JSON.stringify({ message: "No appointments found", status: 200, data: [] });
      }
      const data = appointment.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      return JSON.stringify({ message: "Appointments retrieved successfully", status: 200, data });
    } catch (error: any) {
      return JSON.stringify({ message: "Error fetching appointments", status: 500, error: error.message });
    }
  }
  