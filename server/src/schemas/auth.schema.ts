import { z } from "zod";

export const googleAuthSchema = z
  .object({

    email: z
      .string()
      .trim()
      .email("Invalid email address")
      .toLowerCase(),

    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name cannot exceed 100 characters"),

    photoURL: z
      .string()
      .url("Invalid profile image URL")
      .optional()
      .or(z.literal("")),
  })
  .strict();