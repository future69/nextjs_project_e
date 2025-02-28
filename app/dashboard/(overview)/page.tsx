import { Button } from "@/components/ui/button";
import DashboardCards from "@/components/ui/card";
import ShadBarChart from "@/components/dashboard/barChart";
import ExpensesTable from "@/components/dashboard/expensesTable";

export default function Page() {
  return (
    <main>
      <div className="flex-grow p-6 items-center items-stretch">
        <div className="grid grid-cols-6 gap-8 items-center">
          <DashboardCards />
        </div>
        <div className="grid grid-cols-10 gap-6 pt-6">
          <div className="col-span-5">
            <ShadBarChart />
          </div>
          <div className="col-span-5">
            <ExpensesTable />
          </div>
        </div>
      </div>
    </main>
  );
}
