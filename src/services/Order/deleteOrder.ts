import { db } from '../../database/Client';

export const deleteOrder = async (id: string) => {
  await db.order.delete({ where: { id } });
};
