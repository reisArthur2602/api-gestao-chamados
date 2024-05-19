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
  telefone: z.string().min(11, 'Telefone deve conter 11 dígitos').trim(),
  cpf: z.string().min(11, 'CPF deve conter 11 dígitos').trim(),
});
