import { ICreateOrder } from '../models/order/ICreateOrder';
import { IDeleteOrder } from '../models/order/IDeleteOrder';

import { IOrder } from '../models/order/IOrder';

export interface IOrderRepository {
    create({
        clientId,
        description,
        status,
        subject,
        userId,
    }: ICreateOrder): Promise<IOrder>;
    delete({ id }: IDeleteOrder): Promise<IOrder>;
}
