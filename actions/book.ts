"use server";
import { db } from "@/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

interface bookObject {
  name: string;
  email: string;
  date: string;
  time: string;
  service: string;
}

export async function book(book: bookObject) {
  const appointmentRef = collection(db, "appointments");

  const newDocRef = doc(appointmentRef);
  const uniqueId = newDocRef.id;

  try {
    await setDoc(newDocRef, {
      id: uniqueId,
      name: book.name,
      email: book.email,
      date: book.date,
      time: book.time,
      service: book.service,
      createdAt: serverTimestamp(),
    });

    return JSON.stringify({
      message: "Appointment booked successfully",
      status: 200,
      data: uniqueId,
    });
  } catch (error: any) {
    return JSON.stringify({
      message: "Error booking appointment",
      status: 500,
      error: error.message,
    });
  }
}
