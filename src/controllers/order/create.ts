import { StatusCodes } from 'http-status-codes';
import { HttpRequest, HttpResponse } from '../http';
import { CreateOrderRepository } from '../../repositories/order/create';
import { OrderData, OrderProps, OrderSchema } from '../../models/order';

export const CreateOrderController = async (
  params: HttpRequest<OrderProps>
): Promise<HttpResponse<OrderData | string>> => {
  try {
    const body = OrderSchema.safeParse(params.body);
    if (!body.success)
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: 'Preencha os campos corretamente',
      };
    const order = await CreateOrderRepository(body.data);
    return { statusCode: StatusCodes.CREATED, body: order };
    
  } catch (error: any) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      body: error.message,
    };
  }
};
