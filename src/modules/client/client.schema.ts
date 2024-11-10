import { z } from "zod";

export const RegisterClientSchema = z.object({
  name: z.string().min(1).trim().toLowerCase(),
  email: z.string().min(1).email().trim(),
  address: z.string().min(1).toLowerCase(),
  phone: z.string().length(11).trim(),
  cpf: z.string().length(11).trim(),
});

export const DeleteClientSchema = z.object({
  id: z.string().min(1).trim(),
});
export const EditClientSchema = z.object({
  id: z.string().min(1).trim(),
  name: z.string().min(1).trim().toLowerCase(),
  email: z.string().min(1).email().trim(),
  address: z.string().min(1).toLowerCase(),
  phone: z.string().length(11).trim(),
  cpf: z.string().length(11).trim(),
});
