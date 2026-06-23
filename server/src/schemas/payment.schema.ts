import { z } from "zod";

export const createOrderSchema = z.object({
  plan: z.enum([
    "starter",
    "pro",
    "premium"
  ])
});