import { ICreateOrder } from '../models/order/ICreateOrder';
import { IOrder } from '../models/order/IOrder';

export interface IOrderRepository {
    create({
        clientId,
        description,
        status,
        subject,
        userId,
    }: ICreateOrder): Promise<IOrder>;
}
