"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../../lib/session";
import { redirect } from "next/navigation";
import { errors } from "jose";
import postgres from "postgres";
import bcrypt from "bcryptjs";
import { User } from "lucide-react";

type User = {
  id: number;
  email: string;
  password_hash: string;
};

//Remove required SSL encryption for testing purposes with local postgresDB
const sql = postgres(process.env.POSTGRES_URL!);

//Gets user data and validates
export async function getUser(email: string): Promise<User | null> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email = ${email}`;
    return user[0] || null; // Return null if no user is found
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

// Zob library to verify schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

//Login function validates input and does authentication of input with DB
export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  //If validation fails
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  //Data that user has input
  const { email, password } = result.data;

  //Data retrieved from db matching the email
  const user = await getUser(email);

  // Check if password_hash is defined
  if (!user?.password_hash) {
    return {
      errors: {
        email: ["An error occurred. Please try again later."],
      },
    };
  }

  //----------------------------Remember to add hashing as a check, it checks raw for now
  //  if (!user || !passwordsMatch) {
  //Uses bcrypt library to compare hashed passwords
  //const passwordsMatch = await bcrypt.compare(password, user.password_hash);

  //If authentication fails
  if (!user || password !== user.password_hash) {
    console.log("passwords wrong check hash");
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  //Session cookie is created @ session.ts, using id as field
  await createSession(user.id.toString());
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
