"use server";

import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

interface DateObject {
  date: string;
}

export async function gettime(dateObj: DateObject) {
  const appointmentRef = collection(db, "appointments");

  try {
    const q = query(appointmentRef, where('date', '==', dateObj.date));
    const appointmentsSnap = await getDocs(q);

    if (appointmentsSnap.empty) {
      return JSON.stringify({ message: "No appointments found", status: 200, data: [] });
    }

    const data = appointmentsSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return JSON.stringify({ message: "Appointments retrieved successfully", status: 200, data });
  } catch (error: any) {
    return JSON.stringify({ message: "Error fetching appointments", status: 500, error: error.message });
  }
}
