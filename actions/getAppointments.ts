"use server";
import {db} from "@/lib/firebase";
import {collection , query, where, getDocs, deleteDoc} from "firebase/firestore";
import { a } from "framer-motion/client";
interface userObject {
    email: string;
}
export async function getAppointments(appointments: userObject){
    const appointmentRef = collection(db, "appointments");
    try{
        const appointment = await getDocs(query(appointmentRef, where("email", "==", appointments.email)));
    }
}