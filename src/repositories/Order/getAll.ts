import { Order } from '@prisma/client';
import { db } from '../../database/Client';

export const getAll = async (userId: string): Promise<Order[] | false> => {
  try {
    const orders = await db.order.findMany({ where: { userId } });
    return orders;
  } catch (error) {
    return false;
  }
};
