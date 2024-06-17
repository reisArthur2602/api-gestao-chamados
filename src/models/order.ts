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
  subject: string;
  status: string;
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
