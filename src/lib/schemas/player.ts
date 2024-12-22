import z from "zod";

export const PlayerSchema = z.object({
  name: z.string().nonempty(),
});
