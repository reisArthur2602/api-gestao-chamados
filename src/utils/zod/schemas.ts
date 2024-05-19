import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z
    .string()
    .min(1, 'O email é obrigatório')
    .email('O email fornecido não é válido.')
    .trim(),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  username: z.string().min(1, 'O username é obrigatório').trim(),
});

export const AuthUserSchema = z.object({
  email: z
    .string()
    .min(1, 'O email é obrigatório')
    .email('O email fornecido não é válido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

export const ClientSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').trim().toLowerCase(),
  email: z.string().email('Formato de email inválido').trim(),
  address: z.string().min(1, 'Endereço é obrigatório').trim().toLowerCase(),
  telefone: z.string().length(11, 'Telefone deve conter 11 dígitos').trim(),
  cpf: z.string().length(11, 'CPF deve conter 11 dígitos').trim(),
});

export const OrderSchema = z.object({
  clientId: z.string().min(1, 'clientId é obrigatório'),
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
  description: z.string().min(1, 'Descrição é obrigatória'),
});
