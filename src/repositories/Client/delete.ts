import { db } from '../../database/Client';
import { ClientData } from '../../domain/models/client';

export const deleteClientRepository = async (
  id: string
): Promise<ClientData> => {
  const client = db.client.delete({ where: { id } });
  const orders = db.order.deleteMany({ where: { clientId: id } });

  const deletedClient = await Promise.all([orders, client]).catch(() => {
    throw new Error('Nenhum cliente foi encontrado');
  });

  return deletedClient[1];
};
