"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { z } from "zod";
import sql from "./db";

//Remove required SSL encryption for testing purposes with local postgresDB
//const sql = postgres(process.env.POSTGRES_URL!);

//Validation scheme
const FormSchema = z.object({
  amount: z.coerce.number(),
  description: z.string(),
});

//Use omit to use the same formschema, but removing some values
//const CreateExpense = FormSchema.omit({ id: true, date: true });

//Action to create a new expense
export async function createExpense(id: string | null, formData: FormData) {
  const { description, amount } = FormSchema.parse({
    description: formData.get("description"),
    amount: formData.get("amount"),
  });
  //Get current timestamp to add to db
  const currentDate = new Date().toISOString(); // Get the current timestamp
  try {
    await sql`
  INSERT INTO expenses (user_id, amount, description, date)
  VALUES (${id}, ${amount},${description}, ${currentDate})
`;
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/dashboard/expenses");
  revalidatePath("/dashboard");
  redirect("/dashboard/expenses");
}

// Action to update a single expense
export async function updateExpense(id: number | null, formData: FormData) {
  const { description, amount } = FormSchema.parse({
    description: formData.get("description"),
    amount: formData.get("amount"),
  });
  try {
    await sql`
        UPDATE expenses
        SET description = ${description}, amount = ${amount}
        WHERE id = ${id}
      `;
  } catch (error) {
    console.log("Error updating expense:", error);
  }

  // You can revalidate the path or redirect here if needed
  revalidatePath("/dashboard/expenses");
  revalidatePath("/dashboard");
  redirect("/dashboard/expenses");
}

// Action to update a single expense
export async function deleteExpense(id: number | null, formData: FormData) {
  try {
    await sql`
        DELETE FROM expenses
        WHERE id = ${id}
      `;
  } catch (error) {
    console.log("Error deleting expense", error);
  }

  // You can revalidate the path or redirect here if needed
  revalidatePath("/dashboard/expenses");
  revalidatePath("/dashboard");
}
