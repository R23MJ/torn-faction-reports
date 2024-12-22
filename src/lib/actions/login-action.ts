"use server";

import { LoginSchema } from "@/lib/schemas/login";
import { createSession } from "@/lib/sessions";
import { checkKey } from "@/lib/utils";

export async function LoginAction(state: unknown, formData: FormData) {
  const validationResult = LoginSchema.safeParse({
    apiKey: formData.get("apiKey"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { apiKey } = validationResult.data;

  const selections = await checkKey(apiKey);

  if ("errors" in selections) {
    return selections;
  }

  await createSession(apiKey);
}
