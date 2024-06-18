import { StatusCodes } from 'http-status-codes';
import { HttpRequest, HttpResponse } from '../http';
import { FilterOrderSchema, OrderData, OrderProps } from '../../models/order';
import { FilterOrderRepository } from '../../repositories/order/filter';

export const FilterOrderController = async (
  params: HttpRequest<any>
): Promise<HttpResponse<OrderData[] | string>> => {
  try {
    const body = FilterOrderSchema.safeParse({ ...params.query });
    console.log(body.data);
    if (!body.success)
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: 'Preencha os campos corretamente',
      };
    const order = await FilterOrderRepository(body.data);
    return {
      statusCode: StatusCodes.OK,
      body: order,
    };
  } catch (error: any) {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      body: error.message,
    };
  }
};
