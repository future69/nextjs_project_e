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
        <CardTitle className="text-2xl">Owned Expenses List</CardTitle>
        <CardDescription>Here's all the expenses lists you own</CardDescription>
      </CardHeader>
      <Table className="min-h-[320px]">
        <TableCaption>Owned Expenses List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">List Name</TableHead>
            <TableHead className="text-center">Quantity Of Expenses</TableHead>
            <TableHead className="text-center">Amount</TableHead>

            <TableHead className="text-right">Created Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expensesData.map((data) => (
            <TableRow>
              <TableCell className="font-medium">
                {data.expenseListName}
              </TableCell>
              <TableCell className="text-center">
                {data.expenseListQuantity}
              </TableCell>
              <TableCell className="text-center">
                {data.expenseListTotalValue}
              </TableCell>
              <TableCell className="text-right">
                {new Date(data.expenseListDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
