import { db } from '../../database/Client';
import { OrderData,UpdateOrderProps } from '../../models/order';

export const UpdateOrderRepository = async (
  id: string,
  data: UpdateOrderProps
): Promise<OrderData> => {
  const order = await db.order.update({ where: { id }, data }).catch(() => {
    throw new Error('Nenhum chamado foi encontrado');
  });

  return order;
};
