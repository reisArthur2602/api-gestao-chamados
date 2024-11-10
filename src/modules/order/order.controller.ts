import { OrderRequest, OrderResponse } from "../order/order.types";

import { NotFoundError } from "../../helpers/error";
import ClientRepository, {
  IClientRepository,
} from "../client/client.repository";
import { IOrderRepository, OrderRepository } from "./order.repository";

class OrderController {
  constructor() {
    this.orderRepository = new OrderRepository();
    this.clientRepository = new ClientRepository();
  }
  private orderRepository: IOrderRepository;
  private clientRepository: IClientRepository;

  async create(data: OrderRequest): Promise<void> {
    const hasClientWithId = await this.clientRepository.findById(data.clientId);

    if (!hasClientWithId) {
      throw new NotFoundError("CLIENT_NOT_FOUND");
    }

    await this.orderRepository.create(data);
  }

  async delete(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }

  async finish(id: string): Promise<void> {
    await this.orderRepository.finish(id);
  }

  async list(): Promise<OrderResponse[] | []> {
    const orders = await this.orderRepository.list();
    return orders;
  }
}
export default OrderController;
