import "server-only";

import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { BASE_URL } from "./constants";

const key = new TextEncoder().encode("secret");

export async function encrypt(payload: JWTPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
}

export async function decrypt(input: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });

  return payload;
}

export const sessionCookie = {
  name: "session",
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
  },
  duration: 24 * 60 * 60 * 1000,
};

export async function createSession(apiKey: string) {
  const expires = new Date(Date.now() + sessionCookie.duration);
  const session = await encrypt({ apiKey, expires });

  const cookieStore = await cookies();

  cookieStore.set(sessionCookie.name, session, {
    ...sessionCookie.options,
    expires,
  });
  redirect(`${BASE_URL}/dashboard`);
}

export async function verifySession() {
  const cookieStore = (await cookies()).get(sessionCookie.name)?.value;
  if (!cookieStore) {
    redirect(`${BASE_URL}/login`);
  }

  const session = await decrypt(cookieStore);
  if (!session?.apiKey) {
    redirect(`${BASE_URL}/login`);
  }

  return { apiKey: session.apiKey };
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookie.name);
  redirect(`${BASE_URL}/login`);
}
