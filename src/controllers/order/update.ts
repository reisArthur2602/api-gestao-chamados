import { StatusCodes } from 'http-status-codes';
import { HttpRequest, HttpResponse } from '../http';
import {
  OrderData,
  UpdateOrderProps,
  UpdateOrderSchema,
} from '../../domain/models/order';
import { UpdateOrderRepository } from '../../repositories/order/update';

export const UpdateOrderController = async (
  params: HttpRequest<UpdateOrderProps>
): Promise<HttpResponse<OrderData | string>> => {
  try {
    const id = params.params as string;

    const body = UpdateOrderSchema.safeParse({ ...params.body, id });
    console.log(body , params.body);
    if (!body.success) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: 'Preencha os campos corretamente',
      };
    }

    const order = await UpdateOrderRepository(id, body.data);

    return { statusCode: StatusCodes.OK, body: order };
  } catch (error: any) {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      body: error.message,
    };
  }
};
