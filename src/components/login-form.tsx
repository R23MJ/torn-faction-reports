"use client";

import React, { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginAction } from "@/lib/actions/login-action";
import { cn } from "@/lib/utils";

export default function LoginForm() {
  const [state, action, pending] = useActionState(LoginAction, {
    errors: { apiKey: [] },
  });

  return (
    <form action={action} className="flex flex-col items-center gap-1">
      <Input placeholder="Torn API Key" name="apiKey" type="text" />
      {state?.errors && <p className="text-red-600">{state.errors.apiKey}</p>}

      <Button
        disabled={pending}
        className={cn("w-full", {
          "bg-gray-400": pending,
        })}
      >
        {pending ? "Validating..." : "Login"}
      </Button>
    </form>
  );
}
