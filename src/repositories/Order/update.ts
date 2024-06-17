import { db } from '../../database/Client';
import { OrderData, OrderProps } from '../../models/order';

export const UpdateOrderRepository = async (
  id: string,
  data: Partial<OrderProps>
): Promise<OrderData> => {
  const order = await db.order.update({ where: { id }, data }).catch(() => {
    throw new Error('Nenhum chamado foi encontrado');
  });

  return order;
};
