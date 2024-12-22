import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt, sessionCookie } from "@/lib/sessions";
import { redirect } from "next/navigation";

export default async function middleware(request: NextRequest) {
  const protected_routes = ["/", "/dashboard"];
  const current_route = request.nextUrl.pathname;
  const isProtected = protected_routes.includes(current_route);

  if (isProtected) {
    const cookieStore = request.cookies.get(sessionCookie.name)?.value;
    if (!cookieStore) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const session = await decrypt(cookieStore);
    if (!session?.apiKey) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (current_route === "/dashboard" || current_route === "/") {
    return NextResponse.redirect(new URL("/dashboard/energy", request.url));
  }

  return NextResponse.next();
}
