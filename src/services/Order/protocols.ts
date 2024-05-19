import { Prisma } from '@prisma/client';
import { db } from '../../database/Client';

export type OrderProps = Prisma.Args<typeof db.order, 'create'>['data'];

export type UpdateOrderProps = Prisma.Args<typeof db.client, 'update'>['data'] & { id: string };

