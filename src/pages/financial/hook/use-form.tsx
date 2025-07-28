import { z } from "zod";

export const budgedSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  portion: z.enum(["percentage", "nominal", "hybrid"], {
    error: "Porsi is required",
  }),
});

export type BudgetFormValues = z.infer<typeof budgedSchema>;

export const goalSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  portion: z.enum(["percentage", "nominal", "hybrid"], {
    error: "Porsi is required",
  }),
});

export type GoalFormValues = z.infer<typeof budgedSchema>;
