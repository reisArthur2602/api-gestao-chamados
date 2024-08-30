import { StatusCodes } from 'http-status-codes';
import { ClientData } from '../../domain/models/client';
import { HttpRequest, HttpResponse } from '../http';
import { GetAllClientRepository } from '../../repositories/Client/get';

export const GetAllClientController = async (
  params: HttpRequest<any>
): Promise<HttpResponse<ClientData[] | string>> => {
  try {
    const id = params.userId as string;
    const client = await GetAllClientRepository(id);

    return { statusCode: StatusCodes.OK, body: client };
  } catch (error: any) {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      body: error.message,
    };
  }
};
