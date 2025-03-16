import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getSessionUser } from "@/lib/session";
import { fetchCardData } from "@/lib/data";

//Dashbord cards, contain UI as well as fetched data
//Data should be pre processed
export default async function DashboardCards() {
  const userId = await getSessionUser();
  //Get expense data and pass userID prop
  const data = await fetchCardData(userId); // Fetching expenses data
  return (
    <>
      <Card className="col-span-2 p-6 rounded-xl bg-white min-h-full">
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
          <CardDescription>All your expenses</CardDescription>
        </CardHeader>
        <CardContent className="text-left">
          <p className="font-semibold text-2xl text-gray-900">
            ${data.totalExpenses}
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-2 p-6 rounded-xl bg-white min-h-full">
        <CardHeader>
          <CardTitle>Most Expensive Item</CardTitle>
          <CardDescription>Your most expensive purchase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-left">
          <p className="font-semibold text-2xl text-gray-900">
            ${data.mostExpensiveItem.Amount} - {""}
            {data.mostExpensiveItem.Description}
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-2 p-6 rounded-xl bg-white min-h-full">
        <CardHeader>
          <CardTitle>Latest Expense</CardTitle>
          <CardDescription>Your most recent purchase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-left">
          <p className="font-semibold text-2xl text-gray-900 ">
            {data.latestExpense.Description} - {""}
            {new Date(data.latestExpense.Date).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </>
  );
}
