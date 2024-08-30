import { StatusCodes } from 'http-status-codes';
import { HttpRequest, HttpResponse } from '../http';
import { OrderData } from '../../domain/models/order';
import { DeleteOrderRepository } from '../../repositories/order/deleteOrder';

export const DeleteOrderController = async (
  params: HttpRequest<any>
): Promise<HttpResponse<OrderData | string>> => {
  try {
    const userId = params.params as string;

    const order = await DeleteOrderRepository(userId);
    return { statusCode: StatusCodes.OK, body: order };
  } catch (error: any) {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      body: error.message,
    };
  }
};
