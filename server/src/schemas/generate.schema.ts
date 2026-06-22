import { z } from "zod";

export const GenerateNotesSchema = z.object({
  topic: z
    .string()
    .trim()
    .min(2, "Topic must be at least 2 characters")
    .max(200, "Topic is too long"),

  classLevel: z
    .string()
    .trim()
    .min(1, "Class level is required")
    .max(100, "Class level is too long"),

  examType: z
    .string()
    .trim()
    .min(1, "Exam type is required")
    .max(100, "Exam type is too long"),

  revisionMode: z.boolean().default(false),

  includeDiagram: z.boolean().default(false),

  includeChart: z.boolean().default(false),
});

export type GenerateNotesInput = z.infer<
  typeof GenerateNotesSchema
>;