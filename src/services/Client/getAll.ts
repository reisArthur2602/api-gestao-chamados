import { Client } from '@prisma/client';
import { db } from '../../database/Client';

export const getAll = async (userId: string): Promise<Client[] | false> => {
  try {
    const clients = await db.client.findMany({ where: { userId } });
    return clients;
  } catch (error) {
    return false;
  }
};
