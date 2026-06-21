import { z } from "zod";

export const googleAuthSchema = z
  .object({
    uid: z.string().min(1, "Firebase UID is required"),

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

    emailVerified: z.boolean(),
  })
  .strict();