import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createExpense } from "@/lib/actions";
import Link from "next/link";

export default async function addExpenseForm({ id }: { id: string | null }) {
  //FormData is a object. bind attaches the id to the object. As you need to pass id + form data
  //FormData will send data according name attributes of the inputs
  const addExpenseWithId = createExpense.bind(null, id);
  return (
    <Card className="rounded-xl p-6">
      <CardHeader>
        <CardTitle className="text-2xl">Add Expense</CardTitle>
        <CardDescription>
          Enter the details of your expense below
        </CardDescription>
      </CardHeader>

      <form action={addExpenseWithId} className="space-y-4">
        <div>
          <Label htmlFor="description">Expense Description</Label>
          <Input
            id="description"
            name="description"
            placeholder="Enter expense details"
            required
          />
        </div>

        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            placeholder="Enter amount"
            required
          />
        </div>
        <div className="flex space-x-4 items-center justify-center">
          <Link
            href="/dashboard/expenses"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>

          <Button
            type="submit"
            className="w-1/3 cursor-pointer"
            variant="default"
          >
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
}
