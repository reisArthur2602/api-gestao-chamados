import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().min(1).email().trim(),
  password: z.string().min(6),
  username: z.string().min(1).trim(),
});

export const AuthUserSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(6),
});

export const ClientSchema = z.object({
  name: z.string().min(1).trim().toLowerCase(),
  email: z.string().email().trim(),
  address: z.string().min(1).trim().toLowerCase(),
  telefone: z.string().length(11).trim(),
  cpf: z.string().length(11).trim(),
});

export const OrderSchema = z.object({
  clientId: z.string().min(1),
  subject: z.enum([
    'network-troubleshooting',
    'hardware-troubleshooting',
    'os-support',
    'inventory-management',
    'internet-connectivity',
    'os-installation',
    'server-setup',
  ]),
  status: z
    .enum(['open', 'in-progress', 'on-hold', 'resolved', 'cancelled'])
    .default('open'),
  description: z.string().min(1),
});

export const UpdateOrderSchema = z.object({
  id: z.string().min(1),
  subject: z
    .enum([
      'network-troubleshooting',
      'hardware-troubleshooting',
      'os-support',
      'inventory-management',
      'internet-connectivity',
      'os-installation',
      'server-setup',
    ])
    .optional(),
  status: z
    .enum(['open', 'in-progress', 'on-hold', 'resolved', 'cancelled'])
    .default('open')
    .optional(),
  description: z.string().optional(),
});

export const UpdateClientSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().toLowerCase().optional(),
  email: z.string().email().trim().optional(),
  address: z.string().trim().toLowerCase().optional(),
  telefone: z.string().length(11).trim().optional(),
  cpf: z.string().length(11).trim().optional(),
});
