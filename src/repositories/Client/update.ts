import { Client } from '@prisma/client';
import { UpdateClientProps } from './protocols';
import { db } from '../../database/Client';

export const update = async (data: UpdateClientProps) => {
  await db.client.update({ where: { id: data.id }, data });
};
