"use server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

export async function login(formdata: FormData) {
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;

    if (!email || !password) {
        return JSON.stringify({ message: "All inputs are required", status: 400 });
    }
    const useRef = collection(db,"users");
    try {
        const user = await getDocs(query(useRef, where("email", "==", email)));

        if (user.empty) {
            return JSON.stringify({ message: "Invalid credentials", status: 400 });
        }

        const isValidPassword = await bcrypt.compare(password, user.docs[0].data().password);
        if (!isValidPassword) {
            return JSON.stringify({ message: "Invalid credentials", status: 400 });
        }

        return JSON.stringify({ message: "Login successful", status: 200 });
    } catch (error: any) {
        console.error("Error logging in user:", error);
        return JSON.stringify({ message: "Failed to login user", status: 500 });
      }
 }
