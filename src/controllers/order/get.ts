import { StatusCodes } from 'http-status-codes';
import { HttpRequest, HttpResponse } from '../http';
import { OrderData} from '../../domain/models/order';
import { GetAllOrderRepository } from '../../repositories/order/get';

export const GetAllOrderController = async (
  params: HttpRequest<any>
): Promise<HttpResponse<OrderData[] | string>> => {
  try {
  const userId = params.userId as string

    const order = await GetAllOrderRepository(userId);
    return { statusCode: StatusCodes.OK, body: order };
  } catch (error: any) {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      body: error.message,
    };
  }
};
