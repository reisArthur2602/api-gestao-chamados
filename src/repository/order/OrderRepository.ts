import { db } from '../../database/Client';
import { ICreateOrder } from '../../domain/models/order/ICreateOrder';
import { IOrder } from '../../domain/models/order/IOrder';
import { IOrderRepository } from '../../domain/repository/IOrderRepository';

class OrderRepository implements IOrderRepository {
    async create({
        clientId,
        description,
        status,
        subject,
        userId,
    }: ICreateOrder): Promise<IOrder> {
        const order = await db.order.create({
            data: { clientId, description, status, subject, userId },
        });
        return order;
    }
}
export default OrderRepository;
