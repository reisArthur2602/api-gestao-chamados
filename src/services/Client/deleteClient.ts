import { db } from '../../database/Client';

export const deleteClient = async (id: string) => {
  await db.client.delete({ where: { id } });
};
