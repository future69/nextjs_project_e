import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { fetchOwnedExpensesList } from "@/lib/data";
import { getSessionUser } from "@/lib/session";

export default async function ExpensesTable() {
  const userId = await getSessionUser();
  //Get expense data and pass userID prop
  const expensesData = await fetchOwnedExpensesList(userId); // Fetching expenses data

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Expenses List</CardTitle>
        <CardDescription>Here's all the expenses you have</CardDescription>
      </CardHeader>
      <Table className="min-h-[320px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Expense Description</TableHead>
            <TableHead className="text-center">Amount</TableHead>
            <TableHead className="text-center">Created Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expensesData.map((data) => (
            <TableRow key={data.expeneseId}>
              <TableCell className="font-medium">
                {data.expenseDescription}
              </TableCell>
              <TableCell className="text-center">
                {data.expenseAmount}
              </TableCell>
              <TableCell className="text-center">
                {new Date(data.expenseDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
