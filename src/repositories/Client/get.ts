import { Client } from '@prisma/client';
import { db } from '../../database/Client';

export const GetAllClientRepository = async (
  userId: string
): Promise<Client[]> => {
  const clients = await db.client.findMany({ where: { userId } });
  if (clients.length === 0) throw new Error('Nenhum cliente foi encontrado');

  return clients;
};
