"use server";
import {db} from "@/lib/firebase";
import {collection, deleteDoc, doc, query} from "firebase/firestore";
import { getDoc, where } from "firebase/firestore";
export default async function cancelAppointment(appointmentId: string) {
    const appointmentRef = collection(db, "appointments");

    try{
        const appointmentDoc = doc(appointmentRef, appointmentId);
        if(appointmentDoc === null) {
            return JSON.stringify({
                message: "Appointment not found",
                status: 404,
            });
        }
        await deleteDoc(appointmentDoc);
        return JSON.stringify({
            message: "Appointment cancelled successfully",
            status: 200,
        });
    }catch (error: any) {
        return JSON.stringify({
            message: "Error cancelling appointment",
            status: 500,
            error: error.message,
        });
    }
}