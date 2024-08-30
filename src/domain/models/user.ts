import { z } from 'zod';

export type UserProps = {
  email: string;
  password: string;
  username: string;
};
export type UserData = {
  id: string;
  email: string;
  username: string;
  token: string;
};

export const CreateUserSchema = z.object({
  email: z.string().min(1).email().trim(),
  password: z.string().min(6),
  username: z.string().min(1).trim(),
});

export const AuthUserSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(6),
});
