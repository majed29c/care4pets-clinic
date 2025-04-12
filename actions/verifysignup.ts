"use server";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { serverTimestamp } from "firebase/firestore";

export async function verifysignup(formdata: FormData) {
  const digits = (formdata.get("digits") as string)?.trim();
  const email = (formdata.get("email") as string)?.trim();

  if (!digits || !email || digits.length !== 6) {
    return JSON.stringify({ message: "Invalid Credentials", status: 400 });
  }

  const authRef = collection(db, "authorization");
  const useRef = collection(db, "users");

  try {
    const autherizedCol = await getDocs(query(authRef, where("email", "==", email)));

    if (autherizedCol.empty) {
      return JSON.stringify({ message: "Email not found", status: 400 });
    }

    const authData = autherizedCol.docs[0].data();
    const storedHash = authData.verificationCode;

    console.log("Entered digits:", digits);
    console.log("Stored hash:", storedHash);

    const verified = await bcrypt.compare(digits, storedHash);

    if (!verified) {
      return JSON.stringify({ message: "Invalid verification code", status: 401 });
    }

    await addDoc(useRef, {
      name: authData.name,
      email: authData.email,
      password: authData.password,
      verificationCode: "",
      createdAt: serverTimestamp(),
    });

    return JSON.stringify({ message: "User created successfully", status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return JSON.stringify({ message: "Failed to create user", status: 500 });
  }
}
