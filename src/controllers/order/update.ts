import { StatusCodes } from 'http-status-codes';
import { HttpRequest, HttpResponse } from '../http';
import { OrderData, OrderProps } from '../../models/order';
import { UpdateOrderRepository } from '../../repositories/order/update';

export const UpdateOrderController = async (
  params: HttpRequest<Partial<OrderProps>>
): Promise<HttpResponse<OrderData | string>> => {
  try {
    const body = params.body;
    const id = params.params as string;

    if (!id || !body) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: 'Preencha os campos corretamente',
      };
    }

    const order = await UpdateOrderRepository(id, body);
    return { statusCode: StatusCodes.OK, body: order };
  } catch (error: any) {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      body: error.message,
    };
  }
};
