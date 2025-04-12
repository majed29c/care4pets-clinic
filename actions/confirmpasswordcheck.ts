"use server";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { serverTimestamp } from "firebase/firestore";

const generateRandomCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export async function confirmpasswordcheck(formdata: FormData) {
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;
  const confirmPwd = formdata.get("confirm_password") as string;

  if (!email || !password || !confirmPwd) {
    return JSON.stringify({ message: "All fields are required", status: 400 });
  }

  if (password !== confirmPwd) {
    return JSON.stringify({ message: "Passwords do not match", status: 400 });
  }

  const usersRef = collection(db, "users");
  const authRef = collection(db, "authorization");

  const verificationCode = generateRandomCode() as string;
  const hashedVerification = await bcrypt.hash(verificationCode, 10);
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("Generated code:", verificationCode);
  console.log("Hashed code:", hashedVerification);

  try {
    // Check if user exists
    const userSnap = await getDocs(query(usersRef, where("email", "==", email)));
    if (userSnap.empty) {
      return JSON.stringify({ message: "User not found", status: 400 });
    }

    // Send email
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
      subject: "Password Reset Verification",
      text: `Hello, your verification code is: ${verificationCode}. Use this code to confirm your password reset.`,
    };

    await transporter.sendMail(mailOptions);

    const authSnap = await getDocs(query(authRef, where("email", "==", email)));

    if (authSnap.empty) {
      await addDoc(authRef, {
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
    console.error("Error in confirmpasswordcheck:", error);
    return JSON.stringify({ message: "Failed to verify password", status: 500 });
  }
}
