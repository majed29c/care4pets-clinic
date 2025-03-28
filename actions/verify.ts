"use server";
import bcrypt from "bcryptjs";
import { db } from "@/db/index";

export async function verify(formdata: FormData) {
  const email = formdata.get("email") as string;
  const digits = formdata.get("digits") as string;

  try {

    const user = await db.user.findFirst({
      where: { email },
    });

    if (!user) {
      return JSON.stringify({ message: "User not found", status: 400 });
    }
    const comp = await bcrypt.compare(digits, user.encrpted); 

    if(!comp){
      return JSON.stringify({message : "verification failed ", status: 401});
    }

    const tempData = await db.temp.findFirst({
      where: { email },
    });
   
    if (!tempData) {
      return JSON.stringify({ message: "Something went wrong!", status: 400 });
    }
  
    const updatedRecord = await db.user.update({
      where: { email },
      data: { password: tempData.password },
    });

    if (!updatedRecord) {
      return JSON.stringify({ message: "Failed to update password", status: 400 });
    }

    return JSON.stringify({ message: "Password updated successfully!", status: 200 });

  } catch (error: any) {
    console.error("Error during verification process:", error);
    return JSON.stringify({ message: "Internal server error", status: 500 });
  }
}
