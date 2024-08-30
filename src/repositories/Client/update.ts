import { db } from '../../database/Client';
import { ClientData, UpdateClientProps } from '../../domain/models/client';

export const UpdateClientRepository = async (
  id: string,
  data: UpdateClientProps
): Promise<ClientData> => {
  const client = await db.client.update({ where: { id }, data }).catch(() => {
    throw new Error('Nenhum cliente foi encontrado');
  });

  return client;
};
