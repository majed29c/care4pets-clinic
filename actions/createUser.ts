"use server";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const generateRandomCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
export async function createUser(data: FormData) {
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const name = data.get("name") as string;
  if (!name || !email || !password) {
    return JSON.stringify({ message: "All fields are required", status: 400 });
  }

  const usersRef = collection(db, "users");
  const authRef = collection(db, "authorization");

  const verificationCode = generateRandomCode();
  const hashedVerification = await bcrypt.hash(verificationCode, 10);
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const userSnap = await getDocs(query(usersRef, where("email", "==", email)));
    if (!userSnap.empty) {
      return JSON.stringify({ message: "Email already in use", status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "contact@care4pets.com",
      to: email,
      subject: "Account Verification",
      text: `Hello ${name}, your verification code is: ${verificationCode}. Use this code to verify your account.`,
    };

    await transporter.sendMail(mailOptions);

    const authSnap = await getDocs(query(authRef, where("email", "==", email)));
    if (authSnap.empty) {
      await addDoc(authRef, {
        name,
        email,
        password: hashedPassword,
        verificationCode: hashedVerification,
        createdAt: serverTimestamp(),
      });
    } else {
      const docId = authSnap.docs[0].id;
      const docRef = doc(db, "authorization", docId);
      await updateDoc(docRef, {
        password: hashedPassword,
        verificationCode: hashedVerification,
        createdAt: serverTimestamp(),
      });
    }

    return JSON.stringify({ message: "Verification code sent", status: 200 });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return JSON.stringify({ message: "Failed to create user", status: 500 });
  }
}
