import { db } from '../../database/Client';
import { OrderData, OrderProps } from '../../domain/models/order';

export const FilterOrderRepository = async (
  data: Pick<OrderProps, 'status'>
): Promise<OrderData[]> => {
  const orders = await db.order.findMany({ where: { status: data.status } });
  if (orders.length === 0) throw new Error('Nenhum chamado foi encontrado');
  return orders;
};
