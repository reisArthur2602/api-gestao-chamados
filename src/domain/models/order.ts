import { z } from 'zod';

export type OrderData = {
  id: string;
  clientId: string;
  userId: string;
  subject: string;
  status: string;
  description: string;
  date: Date;
};

export type OrderProps = {
  clientId: string;
  userId: string;
  subject:
    | 'network-troubleshooting'
    | 'hardware-troubleshooting'
    | 'os-support'
    | 'inventory-management'
    | 'internet-connectivity'
    | 'os-installation'
    | 'server-setup';
  status: 'open' | 'in-progress' | 'resolved';
  description: string;
};

export const OrderSchema = z.object({
  clientId: z.string().min(1),
  userId: z.string().min(1).trim(),
  subject: z.enum([
    'network-troubleshooting',
    'hardware-troubleshooting',
    'os-support',
    'inventory-management',
    'internet-connectivity',
    'os-installation',
    'server-setup',
  ]),
  status: z.enum(['open', 'in-progress', 'resolved']).default('open'),
  description: z.string().min(1),
});

export type UpdateOrderProps = {
  subject?: string;
  status?: string;
};

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
  status: z.enum(['open', 'in-progress', 'resolved']).optional(),
});

export const FilterOrderSchema = z.object({
  status: z.enum(['open', 'in-progress', 'resolved']),
});
