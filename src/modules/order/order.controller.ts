import { OrderRequest, OrderResponse } from "../order/order.types";

import { NotFoundError } from "../../helpers/error";
import ClientRepository, {
  IClientRepository,
} from "../client/client.repository";
import { IOrderRepository, OrderRepository } from "./order.repository";
import {
  CategoryRepository,
  ICategoryRepository,
} from "../category/category.repository";

class OrderController {
  constructor() {
    this.orderRepository = new OrderRepository();
    this.clientRepository = new ClientRepository();
    this.categoryRepository = new CategoryRepository();
  }
  private orderRepository: IOrderRepository;
  private clientRepository: IClientRepository;
  private categoryRepository: ICategoryRepository;

  async create(data: OrderRequest): Promise<void> {
    const hasClientWithId = await this.clientRepository.findById(data.clientId);

    if (!hasClientWithId) {
      throw new NotFoundError("CLIENT_NOT_FOUND");
    }

    const hasCategoryWithId = await this.categoryRepository.findById(
      data.category_id
    );

    if (!hasCategoryWithId) {
      throw new NotFoundError("CATEGORY_NOT_FOUND");
    }

    await this.orderRepository.create(data);
  }

  async delete(id: string): Promise<void> {
    const hasOrderWithId = await this.orderRepository.findById(id);

    if (!hasOrderWithId) {
      throw new NotFoundError("ORDER_NOT_FOUND");
    }

    await this.orderRepository.delete(id);
  }

  async finish(id: string): Promise<void> {
    const hasOrderWithId = await this.orderRepository.findById(id);

    if (!hasOrderWithId) {
      throw new NotFoundError("ORDER_NOT_FOUND");
    }

    await this.orderRepository.finish(id);
  }

  async list(): Promise<OrderResponse[] | []> {
    const orders = await this.orderRepository.list();
    return orders;
  }
}
export default OrderController;
