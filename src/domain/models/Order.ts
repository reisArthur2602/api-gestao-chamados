import { CategoryResponse } from "./Category";
import { IUser } from "./user/IUser";

export type OrderResponse = {
  id: string;
  clientId: string;
  userId: string;
  status: boolean;
  category_id: string;
  description: string;
  created_at: Date;
  category?: CategoryResponse;
  user?: Pick<IUser, "username">;
};

export type OrderRequest = {
  clientId: string;
  userId: string;
  category_id: string;
  description: string;
};
