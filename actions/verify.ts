"use server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";

export async function verify(formdata: FormData) {
  const email = formdata.get("email") as string;
  const digits = formdata.get("digits") as string;

  const usersRef = collection(db, "users");
  const authRef = collection(db, "authorization");

  try {
    const authSnap = await getDocs(query(authRef, where("email", "==", email)));
    if (authSnap.empty) {
      return JSON.stringify({ message: "Verification info not found", status: 400 });
    }

    const authDoc = authSnap.docs[0];
    const authData = authDoc.data();

    const isCodeValid = await bcrypt.compare(digits, authData.verificationCode);
    if (!isCodeValid) {
      return JSON.stringify({ message: "Verification failed", status: 401 });
    }

    const userSnap = await getDocs(query(usersRef, where("email", "==", email)));
    if (userSnap.empty) {
      return JSON.stringify({ message: "User not found", status: 400 });
    }

    const userDoc = userSnap.docs[0];
    const userRef = doc(db, "users", userDoc.id);

    await updateDoc(userRef, {
      password: authData.password,
      updatedAt: new Date()
    });

    const authDocRef = doc(db, "authorization", authDoc.id);
    await updateDoc(authDocRef, {
      verificationCode: "", 
    });

    return JSON.stringify({ message: "Password updated successfully!", status: 200 });

  } catch (error: any) {
    console.error("Error during verification process:", error);
    return JSON.stringify({ message: "Internal server error", status: 500 });
  }
}
