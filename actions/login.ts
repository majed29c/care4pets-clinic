"use server";
import { db } from "@/db/index";
import bcrypt from "bcryptjs";

export async function login(formdata: FormData) {
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;

    if (!email || !password) {
        return JSON.stringify({ message: "All inputs are required", status: 400 });
    }

    try {
        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            return JSON.stringify({ message: "Invalid credentials", status: 400 });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return JSON.stringify({ message: "Invalid credentials", status: 400 });
        }

        return JSON.stringify({ message: "Login successful", status: 200 });
    } catch (error: any) {
        console.error("Error logging in user:", error);
        return JSON.stringify({ message: "Failed to login user", status: 500 });
    }
}
