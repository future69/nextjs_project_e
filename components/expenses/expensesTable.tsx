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
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DeleteExpenseButton, EditExpenseButton } from "./ui/expenseButtons";

import { fetchOwnedExpensesList } from "@/lib/data";
import { getSessionUser } from "@/lib/session";
import { AddExpenseButton } from "@/components/expenses/ui/expenseButtons";

export default async function expensesTable() {
  const userId = await getSessionUser();
  const expensesData = await fetchOwnedExpensesList(userId); // Fetching expenses data

  return (
    <Card className="rounded-xl m-15 ">
      <div className="grid grid-cols-1">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Expenses List</CardTitle>
            <AddExpenseButton />
          </div>
          <CardDescription className="pb-5">
            Here you can create, edit & delete your expenses
          </CardDescription>
        </CardHeader>

        <Table className="min-h-[320px] max-w-[95%] mx-auto">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[100px] text-center">
                Expense Description
              </TableHead>
              <TableHead className="text-center">Amount</TableHead>
              <TableHead className="text-right">Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expensesData.map((data) => (
              <TableRow key={data.expeneseId}>
                <TableCell className="font-medium text-center">
                  {data.expenseDescription}
                </TableCell>
                <TableCell className="text-center">
                  {data.expenseAmount}
                </TableCell>
                <TableCell className="text-right">
                  {new Date(data.expenseDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end">
                    <EditExpenseButton id={data.expeneseId} />
                    <DeleteExpenseButton id={data.expeneseId} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
