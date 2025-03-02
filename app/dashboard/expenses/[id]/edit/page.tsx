import EditExpensesForm from "@/components/expenses/editExpenseForm";
import { expensesPageRetrieveExpenses } from "@/lib/data";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  //Params is automatically given to Page files
  const params = await props.params;
  const expenseListId = parseInt(params.id);

  //Must call server retrieve query here(Page.tsx) then pass to component
  const data = await expensesPageRetrieveExpenses(expenseListId); // Fetching expenses data

  return (
    <div className="grid grid-cols-7 gap-6 pt-6 ">
      <div className="m-5 grid-cols-subgrid col-span-3 col-start-3">
        <EditExpensesForm expensesData={data}></EditExpensesForm>
      </div>
    </div>
  );
}
