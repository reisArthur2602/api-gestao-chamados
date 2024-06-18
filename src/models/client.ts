import { z } from 'zod';

export type ClientData = {
  id: string;
  name: string;
  email: string;
  address: string;
  userId: string;
  cpf: string;
  telefone: string;
};

export type ClientProps = Omit<ClientData, 'id'>;

export type UpdateClientProps = {
  address?: string;
  telefone?: string;
};

export const ClientSchema = z.object({
  name: z.string().min(1).trim().toLowerCase(),
  userId: z.string().min(1).trim(),
  email: z.string().email().trim(),
  address: z.string().min(1).trim().toLowerCase(),
  telefone: z.string().length(11).trim(),
  cpf: z.string().length(11).trim(),
});

export const UpdateClientSchema = z.object({
  id: z.string().min(1).optional(),
  address: z.string().min(1).trim().toLowerCase().optional(),
  telefone: z.string().length(11).trim().optional(),
});
