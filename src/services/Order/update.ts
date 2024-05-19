import { UpdateOrderProps } from './protocols';
import { db } from '../../database/Client';

export const update = async (data: UpdateOrderProps) => {
  await db.order.update({ where: { id: data.id }, data });
};
