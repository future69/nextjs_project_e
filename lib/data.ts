import postgres from "postgres";

//Remove required SSL encryption for testing purposes with local postgresDB
const sql = postgres(process.env.POSTGRES_URL!);

//This table is for the dashboard page
export async function fetchOwnedExpensesList(props: string | null) {
  try {
    // Ensure props is a valid string and convert to a number
    const idNum = props ? parseInt(props, 10) : null;
    if (!idNum) {
      throw new Error("Invalid user ID.");
    }
    const data = await sql`SELECT 
        el.id,
        el.name, 
        el.created_at, 
        COUNT(e.id) AS total_expenses,  
        COALESCE(SUM(e.amount), 0) AS total_amount
    FROM expense_lists el
    LEFT JOIN expenses e ON el.id = e.expense_list_id
    WHERE el.owner_id = ${idNum}
    GROUP BY el.id;`;

    const latestExpenses = data.map((data) => ({
      expenseListId: data.id,
      expenseListName: data.name,
      expenseListDate: data.created_at,
      expenseListTotalValue: data.total_amount,
      expenseListQuantity: data.total_expenses,
    }));

    return latestExpenses;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest expenses.");
  }
}

//This table is for expenses page
export async function expensesPageOwnedList(props: string | null) {
  try {
    // Ensure props is a valid string and convert to a number
    const idNum = props ? parseInt(props, 10) : null;
    if (!idNum) {
      throw new Error("Invalid user ID.");
    }
    const data = await sql`SELECT 
          el.name, 
          el.created_at, 
          COUNT(e.id) AS total_expenses,  
          COALESCE(SUM(e.amount), 0) AS total_amount
      FROM expense_lists el
      LEFT JOIN expenses e ON el.id = e.expense_list_id
      WHERE el.owner_id = ${idNum}
      GROUP BY el.id;`;

    const latestExpenses = data.map((data) => ({
      expenseListName: data.name,
      expenseListDate: data.created_at,
      expenseListTotalValue: data.total_amount,
      expenseListQuantity: data.total_expenses,
    }));

    return latestExpenses;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest expenses.");
  }
}
