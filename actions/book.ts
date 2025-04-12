"use server";
import {db} from "@/lib/firebase";
import {collection, query, where, getDocs} from "firebase/firestore";
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

    }catch(error:any){
        return JSON.stringify({message: "Error fetching appointments", status: 500, error: error.message});
    }

}