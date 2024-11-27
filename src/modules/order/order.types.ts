import { CategoryResponse } from "../category/category.types";
import { ClientResponse } from "../client/client.types";
import { UserResponse } from "../user/user.types";

export type OrderResponse = {
  id: string;
  clientId: string;
  userId: string;
  category_id: string;
  status: boolean;
  created_at: Date;
  description: string;
};

export type ListOrderResponse = {
  id: string;
  status: boolean;
  description: string;
  created_at: Date;
  category: CategoryResponse;
  client: ClientResponse;
  user: Pick<UserResponse, "username" | "id">;
};

export type OrderRequest = {
  clientId: string;
  userId: string;
  category_id: string;
  description: string;
};
