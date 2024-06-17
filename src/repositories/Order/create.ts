import { db } from '../../database/Client';
import { OrderData, OrderProps } from '../../models/order';

export const CreateOrderRepository = async (
  data: OrderProps
): Promise<OrderData> => {
  const order = await db.order.create({
    data: data,
  });

  return order;
};
