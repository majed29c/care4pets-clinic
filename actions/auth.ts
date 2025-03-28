// src/server/actions/auth.ts (or wherever your createUser function is)
"use server";
import { db } from "@/db/index"; // Import your database model
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
const generateRandomCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return JSON.stringify({ message: "All fields are required", status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return JSON.stringify({ message: "Email already in use", status: 400 });
    }
    const verificationCode= generateRandomCode();
    const hashedVerification = await bcrypt.hash(verificationCode,10);
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
          subject: "Password Confirmation",
          text: `Hello, your verification code is: ${verificationCode}. Use this code to confirm your password reset.`,
        };
    
    await transporter.sendMail(mailOptions);
    let authorize;
    const rec = await db.authorization.findFirst({
      where : {email},
    });
    if(!rec){
      authorize = await db.authorization.create({
      data : {name, email, password : hashedPassword, encrypted:hashedVerification},
    });
    if(!authorize){
      return JSON.stringify({message:"something went wrong", status:401});
    }
  }else{
    authorize = await db.authorization.update({
      where : {email},
      data : {password : hashedPassword},
    });
    if(!authorize){
      return JSON.stringify({message:"something went wrong", status:401});
    }
  }
    return JSON.stringify({status: 200 });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return JSON.stringify({ message: "Failed to create user", status: 500 });
  }
}
