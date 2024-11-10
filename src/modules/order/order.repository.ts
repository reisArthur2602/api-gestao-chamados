import { db } from "../../database/prisma";
import { OrderRequest, OrderResponse } from "../order/order.types";

export interface IOrderRepository {
  create(data: OrderRequest): Promise<void>;
  finish(id: string): Promise<void>;
  delete(id: string): Promise<void>;
  list(): Promise<OrderResponse[] | []>;
  findById(id: string): Promise<OrderResponse | null>;
}

class OrderRepository implements IOrderRepository {
  async create(data: OrderRequest): Promise<void> {
    await db.order.create({
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await db.order.delete({ where: { id } });
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

  async finish(id: string): Promise<void> {
    await db.order.update({
      where: { id },
      data: { status: true },
    });
  }

  async findById(id: string): Promise<OrderResponse | null> {
    const order = await db.order.findUnique({
      where: { id },
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
    return order;
  }
}

export { OrderRepository };
