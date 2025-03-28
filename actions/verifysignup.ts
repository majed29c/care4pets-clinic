"use server";
import { db } from "@/db/index";
import bcrypt from "bcryptjs";

export async function verifysignup(formdata: FormData) {
    const digits = formdata.get("digits") as string;
    const email = formdata.get("email") as string;

    if (!digits || !email) {
        return JSON.stringify({ message: "Invalid Credentials", status: 400 });
    }

    try {
        const autherizedCol = await db.authorization.findFirst({
            where: { email },
        });

        if (!autherizedCol) {
            return JSON.stringify({ message: "Something went wrong", status: 400 });
        }

        const compared = await bcrypt.compare(digits, autherizedCol.encrypted);
        if (!compared) {
            return JSON.stringify({ message: "Failed to verify", status: 401 });
        }

        const user = await db.user.create({
            data: {
                name: autherizedCol.name,
                email,
                password: autherizedCol.password,
            },
        });

        return JSON.stringify({ message: "User created successfully", status: 200 });
    } catch (error) {
        console.error("Database error:", error);
        return JSON.stringify({ message: "Failed to create user", status: 500 });
    }
}
