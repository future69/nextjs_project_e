import AddExpenseForm from "@/components/expenses/addExpenseForm";
import { getSessionUser } from "@/lib/session";

export default async function Page() {
  const userId = await getSessionUser();

  return (
    <div className="grid grid-cols-7 gap-6 pt-6 ">
      <div className="m-5 grid-cols-subgrid col-span-3 col-start-3">
        <AddExpenseForm id={userId} />
      </div>
    </div>
  );
}
