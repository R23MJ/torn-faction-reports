import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TORN_API_URL } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function checkKey(apiKey: string) {
  const response = await fetch(
    `${TORN_API_URL}/key/?key=${apiKey}&selections=info`,
    {
      next: {
        revalidate: 1000 * 60 * 60 * 24,
      },
    }
  );

  if (!response.ok) {
    return {
      errors: {
        apiKey: [
          "An error occurred while trying to validate your API key. Please try again later.",
        ],
      },
    };
  }

  const data = await response.json();

  if ("error" in data) {
    return {
      errors: { apiKey: [data.error.error] },
    };
  }

  if (!("faction" in data.selections)) {
    return {
      errors: {
        apiKey: ["This key does not have faction access."],
      },
    };
  }

  return data.selections;
}
