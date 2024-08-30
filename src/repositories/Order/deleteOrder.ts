import { db } from '../../database/Client';
import { OrderData } from '../../domain/models/order';


export const DeleteOrderRepository = async (
  id: string
): Promise<OrderData> => {
  const order = await db.order.delete({ where: { id } }).catch(() => {
    throw new Error('Nenhum chamado foi encontrado');
  });

  return order;
};
