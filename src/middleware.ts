import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt, sessionCookie } from "@/lib/sessions";
import { BASE_URL } from "./lib/constants";
import { redirect } from "next/navigation";

export default async function middleware(request: NextRequest) {
  const protected_routes = ["/", "/dashboard"];
  const current_route = request.nextUrl.pathname;
  const isProtected = protected_routes.includes(current_route);

  if (isProtected) {
    const cookieStore = request.cookies.get(sessionCookie.name)?.value;
    if (!cookieStore) {
      redirect(`${BASE_URL}/login`);
    }

    const session = await decrypt(cookieStore);
    if (!session?.apiKey) {
      redirect(`${BASE_URL}/login`);
    }
  }

  if (current_route === "/dashboard" || current_route === "/") {
    return NextResponse.redirect(`${BASE_URL}/dashboard/energy`);
  }

  return NextResponse.next();
}
