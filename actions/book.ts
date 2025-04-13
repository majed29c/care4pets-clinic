"use server";
import {db} from "@/lib/firebase";
import {collection, query, where, getDocs, addDoc} from "firebase/firestore";
import {serverTimestamp} from "firebase/firestore";
interface bookObject {
    name: string;
    email: string;
    date: string;
    time: string;
    service: string;
}
export async function book(book: bookObject){
    const appointmentRef = collection(db, "appointments");
    try{
      const data = await addDoc(appointmentRef, {
        name: book.name,
        email: book.email,
        date: book.date,
        time: book.time,
        service: book.service,
        createdAt: serverTimestamp(),
      });
      return JSON.stringify({message: "Appointment booked successfully", status: 200, data: data.id});  
    }catch(error:any){
       return JSON.stringify({message: "Error fetching appointments", status: 500, error: error.message});
    }

}