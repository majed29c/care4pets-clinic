"use server";
import {db} from "@/lib/firebase";
import { getDocs, query, collection, where } from "firebase/firestore";


export async function getInfo(email: string){
   const infoRef = collection(db,"users");
   try{
    const info = await getDocs(query(infoRef, where("email", "==", email)));
    if(info.empty){
        return JSON.stringify({message: "No info found", status: 200, data: null});
    }
    return JSON.stringify({message: "Info retrieved successfully", status: 200, data: info.docs[0].data()});
   }catch(error: any){
    return JSON.stringify({message: "Error fetching info", status: 500, error: error.message});
   }
}