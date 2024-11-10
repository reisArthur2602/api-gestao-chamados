import { z } from "zod";

export const RegisterUserSchema = z.object({
  username: z.string().min(1).trim(),
  email: z.string().min(1).email().trim(),
  password: z.string().min(6),
});
export const SessionUserSchema = z.object({
  email: z.string().min(1).email().trim(),
  password: z.string().min(6),
});
