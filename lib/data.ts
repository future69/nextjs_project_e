import { Description } from "@radix-ui/react-dialog";
import sql from "./db";
import postgres from "postgres";

//Remove required SSL encryption for testing purposes with local postgresDB
//const sql = postgres(process.env.POSTGRES_URL!);

/*------------------------------------------------------DASHBOARD-----------------------------------------------------------------*/
/*------------------------------------------------------DASHBOARD-----------------------------------------------------------------*/
/*------------------------------------------------------DASHBOARD-----------------------------------------------------------------*/
//This SQL is for the table is for the dashboard page
export async function fetchOwnedExpensesList(props: string | null) {
  try {
    // Ensure props is a valid string and convert to a number
    const idNum = props ? parseInt(props, 10) : null;
    if (!idNum) {
      throw new Error("Invalid user ID.");
    }
    const data = await sql`
    SELECT e.id, e.description, e.amount, e.date 
    FROM expenses e
    JOIN users u ON e.user_id = u.id
    WHERE u.id = ${idNum};`;

    const latestExpenses = data.map((data) => ({
      expeneseId: data.id,
      expenseDescription: data.description,
      expenseAmount: data.amount,
      expenseDate: data.date,
    }));

    return latestExpenses;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest expenses.");
  }
}

//This SQL is for the card data is for the dashboard page
export async function fetchCardData(userId: string | null) {
  try {
    const totalExpensesPromise = sql`
    SELECT SUM(amount) AS total_expenses
    FROM expenses
    WHERE user_id = ${userId}`;
    const mostExpensivePromise = sql`SELECT description, amount, date
    FROM expenses
    WHERE user_id = ${userId}
    ORDER BY amount DESC
    LIMIT 1;`;
    const latestExpensePromise = sql`SELECT description, amount, date
    FROM expenses
    WHERE user_id = ${userId}
    ORDER BY date DESC
    LIMIT 1;`;

    const data = await Promise.all([
      totalExpensesPromise,
      mostExpensivePromise,
      latestExpensePromise,
    ]);

    const totalExpenses = data[0][0].total_expenses ?? "0";
    const mostExpensiveItem = data[1][0] ?? {
      description: "N/A",
      amount: "N/A",
    };
    const latestExpense = data[2][0] ?? {
      description: "N/A",
      amount: "N/A",
      date: "N/A",
    };

    return {
      totalExpenses,
      mostExpensiveItem: {
        Description: mostExpensiveItem.description,
        Amount: mostExpensiveItem.amount,
      },
      latestExpense: {
        Description: latestExpense.description,
        Amount: latestExpense.amount,
        Date: latestExpense.date,
      },
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

/*------------------------------------------------------EXPENSES-----------------------------------------------------------------*/
/*------------------------------------------------------EXPENSES-----------------------------------------------------------------*/
/*------------------------------------------------------EXPENSES-----------------------------------------------------------------*/
//This table is for expenses page
export async function expensesPageOwnedList(props: string | null) {
  try {
    // Ensure props is a valid string and convert to a number
    const idNum = props ? parseInt(props, 10) : null;
    if (!idNum) {
      throw new Error("Invalid user ID.");
    }
    const data = await sql`
      SELECT 
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

//1 of 2 SQL for the edit expense page, this to retrieve the expenses of the expense ID
export async function expensesPageRetrieveExpenses(expenseId: number | null) {
  try {
    if (!expenseId) {
      throw new Error("Invalid Expense ID.");
    }
    const data = await sql`
      SELECT id, description, amount
      FROM expenses
      WHERE id = ${expenseId};
      `;

    const result = data.map((data) => ({
      expenseId: data.id,
      expenseDescription: data.description,
      expenseAmount: data.amount,
    }));

    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest expenses.");
  }
}
