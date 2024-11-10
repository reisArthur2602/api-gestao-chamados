import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z.string().min(1).trim().toLowerCase(),
});
export const RemoveCategorySchema = z.object({
  id: z.string().min(1).trim(),
});
