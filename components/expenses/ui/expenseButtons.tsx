import Link from "next/link";

type Props = {
  id: string;
  children?: React.ReactNode;
};

export function EditButton({ id }: Props) {
  return (
    <Link
      href={`/dashboard/expenses/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    ></Link>
  );
}
