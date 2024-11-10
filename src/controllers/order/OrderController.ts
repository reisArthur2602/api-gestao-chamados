import { OrderRequest, OrderResponse } from "../../domain/models/Order";

import { IDeleteOrder } from "../../domain/models/order/IDeleteOrder";
import { IListOrders } from "../../domain/models/order/IListOrders";

import { NotFoundError } from "../../helpers/error";
import ClientRepository, {
  IClientRepository,
} from "../../repository/client/ClientRepository";
import {
  IOrderRepository,
  OrderRepository,
} from "../../repository/order/OrderRepository";

class OrderController {
  constructor() {
    this.orderRepository = new OrderRepository();
    this.clientRepository = new ClientRepository();
  }
  private orderRepository: IOrderRepository;
  private clientRepository: IClientRepository;

  async create(data: OrderRequest): Promise<OrderResponse> {
    const hasClientWithId = await this.clientRepository.findById(data.clientId);
    if (!hasClientWithId) {
      throw new NotFoundError("O cliente não foi encontrado");
    }

    const order = await this.orderRepository.create(data);

    return order;
  }

  async delete({ id }: IDeleteOrder): Promise<OrderResponse> {
    const order = this.orderRepository.delete(id);
    return order;
  }
  async list({ userId }: IListOrders): Promise<OrderResponse[] | []> {
    const orders = this.orderRepository.list();
    return orders;
  }
}
export default OrderController;
