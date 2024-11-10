import { CategoryResponse } from "../category/category.types";
import { UserResponse } from "../user/user.types";


export type OrderResponse = {
  id: string;
  clientId: string;
  userId: string;
  status: boolean;
  category_id: string;
  description: string;
  created_at: Date;
  category: CategoryResponse;
  user: Pick<UserResponse, "username">;
};

export type OrderRequest = {
  clientId: string;
  userId: string;
  category_id: string;
  description: string;
};
