import { Button } from "@/components/ui/button";
import { deleteExpense } from "@/lib/actions";
import Link from "next/link";
import { useId } from "react";

type Props = {
  id: string;
  children?: React.ReactNode;
};

export function EditExpenseButton({ id }: { id: number }) {
  return (
    <Button asChild variant="default" size="default">
      <Link
        href={`/dashboard/expenses/${id}/edit`}
        className="pl-5 pr-5 rounded-md border p-2  "
      >
        Edit
      </Link>
    </Button>
  );
}

export function AddExpenseButton() {
  return (
    <Button asChild variant="default" size="default">
      <Link
        href={`/dashboard/expenses/create`}
        className="pl-5 pr-5 rounded-md border p-2  "
      >
        Add Expense
      </Link>
    </Button>
  );
}

export function DeleteExpenseButton({ id }: { id: number }) {
  const deleteExpenseWithId = deleteExpense.bind(null, id);
  return (
    <>
      <form action={deleteExpenseWithId}>
        <Button
          type="submit"
          className="pl-5 pr-5 rounded-md border p-2 bg-red-500 text-white"
        >
          Delete
        </Button>
      </form>
    </>
  );
}
