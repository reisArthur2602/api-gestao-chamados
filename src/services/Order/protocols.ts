import { Prisma } from "@prisma/client";
import { db } from "../../database/Client";

export type OrderProps = Prisma.Args<
  typeof db.order,
  'create'
>['data'];