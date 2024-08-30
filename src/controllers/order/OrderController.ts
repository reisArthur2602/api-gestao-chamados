import { ICreateOrder } from '../../domain/models/order/ICreateOrder';
import { IDeleteOrder } from '../../domain/models/order/IDeleteOrder';
import { IOrder } from '../../domain/models/order/IOrder';
import { IClientRepository } from '../../domain/repository/IClientRepository';
import { IOrderRepository } from '../../domain/repository/IOrderRepository';
import { NotFoundError } from '../../helpers/error';
import ClientRepository from '../../repository/client/ClientRepositories';
import OrderRepository from '../../repository/order/OrderRepository';

class OrderController {
    constructor() {
        this.orderRepository = new OrderRepository();
        this.clientRepository = new ClientRepository();
    }
    private orderRepository: IOrderRepository;
    private clientRepository: IClientRepository;

    async create({
        clientId,
        description,
        status,
        subject,
        userId,
    }: ICreateOrder): Promise<IOrder> {
        const client = await this.clientRepository.findById({ id: clientId });

        if (!client) throw new NotFoundError('O Cliente não foi encontrado');

        const order = await this.orderRepository.create({
            clientId,
            description,
            status,
            subject,
            userId,
        });
        return order;
    }

    async delete({ id }: IDeleteOrder): Promise<IOrder> {
        const order = this.orderRepository.delete({ id });
        return order;
    }
}
export default OrderController;
