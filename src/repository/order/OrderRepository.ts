import { db } from "../../database/Client";
import { OrderRequest, OrderResponse } from "../../domain/models/Order";

export interface IOrderRepository {
  create(data: OrderRequest): Promise<OrderResponse>;
  delete(id: string): Promise<OrderResponse>;
  list(): Promise<OrderResponse[] | []>;
}

class OrderRepository implements IOrderRepository {
  async create(data: OrderRequest): Promise<OrderResponse> {
    const order = await db.order.create({
      data,
    });
    return order;
  }

  async delete(id: string): Promise<OrderResponse> {
    const client = await db.order.delete({ where: { id } });
    return client;
  }

  async list(): Promise<OrderResponse[] | []> {
    const orders = await db.order.findMany({
      select: {
        id: true,
        clientId: true,
        userId: true,
        status: true,
        category_id: true,
        description: true,
        created_at: true,
        category: true,
        user: {
          select: { username: true },
        },
      },
    });
    return orders;
  }
}
export { OrderRepository };
