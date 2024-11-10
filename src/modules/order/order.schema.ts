import { z } from "zod";

export const CreateOrderSchema = z.object({
  category_id: z.string().min(1),
  clientId: z.string().min(1),
  description: z.string().min(1),
});

export const RemoveOrderSchema = z.object({
  id: z.string().min(1),
});

export const FinishOrderSchema = z.object({
  id: z.string().min(1),
});
