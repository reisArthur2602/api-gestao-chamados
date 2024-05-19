import { Order } from '@prisma/client';
import { OrderProps } from './protocols';
import { db } from '../../database/Client';

export const create = async (data: OrderProps): Promise<Order | false> => {
  try {
    const order = await db.order.create({
      data: data,
    });
    return order;
  } catch (error) {
    console.error('Erro ao criar chamado', error);
    return false;
  }
};
