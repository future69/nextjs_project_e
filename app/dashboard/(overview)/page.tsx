import { Button } from "@/components/ui/button";
import DashboardCards from "@/components/dashboard/dashboardCards";
import ShadPieChart from "@/components/dashboard/pieChart";
import ExpensesTable from "@/components/dashboard/expensesTable";
import { getSessionUser } from "@/lib/session";
import { fetchOwnedExpensesList } from "@/lib/data";

export default async function Page() {
  const userId = await getSessionUser();
  //Get expense data and pass userID prop
  const data = await fetchOwnedExpensesList(userId); // Fetching expenses data
  // Convert to Recharts PieChart format
  const chartData = data.map((expense, index) => ({
    name: expense.expenseDescription, // Expense category
    value: parseFloat(expense.expenseAmount), // Convert string to number
    fill: `hsl(${(index * 60) % 360}, 70%, 50%)`, // Generate unique colors
  }));
  return (
    <main>
      <div className="flex-grow p-6 items-center items-stretch">
        <div className="text-2xl font-bold text-black pb-5">Dashboard</div>
        <div className="grid grid-cols-6 gap-4 items-center">
          <DashboardCards />
        </div>
        <div className="grid grid-cols-10 gap-4 pt-3">
          <div className="col-span-4">
            <ShadPieChart data={chartData} />
          </div>
          <div className="col-span-6">
            <ExpensesTable />
          </div>
        </div>
      </div>
    </main>
  );
}
