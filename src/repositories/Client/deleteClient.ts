import { db } from '../../database/Client';

export const deleteClient = async (id: string) => {
  const client =  db.client.delete({ where: { id } });
  const orders =  db.order.deleteMany({ where: { clientId: id } });

  await Promise.all([orders, client]);
};
