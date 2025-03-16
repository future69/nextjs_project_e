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
  CardContent,
} from "@/components/ui/card";
import { DeleteExpenseButton, EditExpenseButton } from "./ui/expenseButtons";

import { fetchOwnedExpensesList } from "@/lib/data";
import { getSessionUser } from "@/lib/session";
import { AddExpenseButton } from "@/components/expenses/ui/expenseButtons";

export default async function expensesTable() {
  const userId = await getSessionUser();
  const expensesData = await fetchOwnedExpensesList(userId); // Fetching expenses data

  return (
    <div className="w-full">
      <Card className="rounded-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Expenses List</CardTitle>
            <AddExpenseButton />
          </div>
          <CardDescription className="pb-5">
            Here you can create, edit & delete your expenses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expensesData.map((data) => (
                  <TableRow key={data.expeneseId}>
                    <TableCell className="font-medium">
                      {data.expenseDescription}
                    </TableCell>
                    <TableCell>${data.expenseAmount}</TableCell>
                    <TableCell>
                      {new Date(data.expenseDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end pr-5">
                        <EditExpenseButton id={data.expeneseId} />
                        <DeleteExpenseButton id={data.expeneseId} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
