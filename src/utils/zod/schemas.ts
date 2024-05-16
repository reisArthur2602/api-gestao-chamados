import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email('O email fornecido não é válido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  username: z.string().min(3, 'O username deve ter pelo menos 3 caracteres.'),
});
