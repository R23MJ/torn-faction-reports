import z from "zod";

export const LoginSchema = z.object({
  apiKey: z.string().nonempty(),
});
