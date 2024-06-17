import { db } from '../../database/Client';
import { ClientData, ClientProps } from '../../models/client';

export const UpdateClientRepository = async (
  id: string,
  data: Partial<ClientProps>
): Promise<ClientData> => {
  const client = await db.client.update({ where: { id }, data }).catch(() => {
    throw new Error('Nenhum cliente foi encontrado');
  });

  return client;
};
