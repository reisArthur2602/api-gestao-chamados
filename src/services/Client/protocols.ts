import { Prisma } from "@prisma/client";
import { db } from "../../database/Client";

export type ClientProps = Prisma.Args<
  typeof db.client,
  'create'
>['data'];