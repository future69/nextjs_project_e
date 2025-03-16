import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

const protectedRoutes = ["/dashboard", "/dashboard/"];
const publicRoutes = ["/login", "/login/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  //Any other route starting with /dashboard gets redirected
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(path);

  //Checks for cookie before continuing with code
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = await decrypt(cookie);

  //If user is at default index page, redirect to login
  if (path === "/" && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isProtectedRoute && !session?.userId) {
    //If the route requires a session, and there is no session, redirect to login
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  //If the route requires a session, and there is a userId in the session, redirect to dashboard
  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
