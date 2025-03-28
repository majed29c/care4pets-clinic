"use server";
import { db } from "@/db/index";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

const generateRandomCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export async function confirmpasswordcheck(formdata: FormData) {
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;
  const confirmPwd = formdata.get("confirm_password") as string;

  if (!email || !password || !confirmPwd) {
    return JSON.stringify({ message: "All inputs are required", status: 400 });
  }

  if (password !== confirmPwd) {
    return JSON.stringify({ message: "Passwords do not match", status: 400 });
  }

  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return JSON.stringify({ message: "Invalid credentials", status: 400 });
    }

    const verificationCode = generateRandomCode();
    const hashedVerification = await bcrypt.hash(verificationCode, 10);

    const updated = await db.user.update({
      where: { email },
      data: { encrpted: hashedVerification },
    });

    if (!updated) {
      return JSON.stringify({ message: "Failed to update verification code", status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const tempuser = await db.temp.findFirst({
      where: { email },
    });

    let temp;
    if (tempuser) {
      temp = await db.temp.update({
        where: { email },
        data: { email, password: hashedPassword },
      });
    } else {
      temp = await db.temp.create({
        data: { email, password: hashedPassword },
      });
    }

    if (!temp) {
      return JSON.stringify({ message: "Failed to store temporary password", status: 400 });
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
      subject: "Password Confirmation",
      text: `Hello, your verification code is: ${verificationCode}. Use this code to confirm your password reset.`,
    };

    await transporter.sendMail(mailOptions);

    return JSON.stringify({
      message: "Password confirmed and email sent with verification code",
      status: 200,
    });

  } catch (error: any) {
    console.error("Error in confirmpasswordcheck:", error);
    return JSON.stringify({ message: "Failed to verify password", status: 500, error: error.message });
  }
}
