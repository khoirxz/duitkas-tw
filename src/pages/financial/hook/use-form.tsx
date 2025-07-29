import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Wajib diisi"),
  percentage: z.number().min(1, "Minimal 1%"),
});

export const categoryFormSchema = z.object({
  categories: z.array(categorySchema).min(1, "Minimal 1 kategori"),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export const budgedSchema = z.object({
  name: z.string().min(1, { message: "Nama tidak boleh kosong" }),
  portion: z.enum(["percentage", "nominal", "hybrid"], {
    error: "Porsi tidak boleh kosong",
  }),
});

export type BudgetFormValues = z.infer<typeof budgedSchema>;

export const goalSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  portion: z.enum(["percentage", "nominal", "hybrid"], {
    error: "Porsi is required",
  }),
});

export type GoalFormValues = z.infer<typeof goalSchema>;
