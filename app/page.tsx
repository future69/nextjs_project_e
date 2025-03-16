import Link from "next/link";
import LoginPage from "./login/page";

export default function Home() {
  return (
    <div className="flex text-center content-center justify-center align-center rounded-lg bg-black text-white p-4">
      <Link href="/login">Head to login</Link>
    </div>
  );
}
