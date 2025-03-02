import ExpensesTable from "@/components/expenses/expensesTable";
import { getSessionUser } from "@/lib/session";

export default async function Page() {
  const userId = await getSessionUser();
  return (
    <>
      <div className="flex-grow p-6 ">
        <div className="text-2xl font-bold text-black pb-5">Expenses</div>
        <ExpensesTable />
      </div>
    </>
  );
}
