import { db } from '../../database/Client';
import { OrderData } from '../../domain/models/order';

export const GetAllOrderRepository = async (
  userId: string
): Promise<OrderData[]> => {
  const orders = await db.order.findMany({ where: { userId } });
  if (orders.length === 0) throw new Error('Nenhum chamado foi encontrado');
  return orders;
};
