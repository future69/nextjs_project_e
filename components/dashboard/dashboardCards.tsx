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
      <Card className="col-span-2 p-6 rounded-xl bg-white h-[170px]">
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
        </CardHeader>
        <CardContent className="text-left">
          <p className="text-2xl font-bold text-gray-900">
            ${data.totalExpenses}
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-2 p-6 rounded-xl bg-white h-[170px]">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Most Expensive Item
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-left">
          <p className="text-lg font-medium text-gray-800">
            {data.mostExpensiveItem.Description}
          </p>
          <p className="text-2xl font-bold text-red-600">
            ${data.mostExpensiveItem.Amount}
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-2 p-6 rounded-xl bg-white h-[170px]">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Latest Expense
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-left">
          <p className="text-2xl font-bold text-blue-600">
            {new Date(data.latestExpense.Date).toLocaleDateString()}
          </p>
          <p className="text-xl">{data.latestExpense.Description}</p>
        </CardContent>
      </Card>
    </>
  );
}
