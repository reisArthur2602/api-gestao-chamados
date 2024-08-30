import { StatusCodes } from 'http-status-codes';
import { HttpRequest, HttpResponse } from '../http';
import { ClientData } from '../../domain/models/client';
import { deleteClientRepository } from '../../repositories/Client/delete';

export const DeleteClientController = async (
  params: HttpRequest<any>
): Promise<HttpResponse<ClientData | string>> => {
  try {
    const id = params.params as string

    const client = await deleteClientRepository(id);

    return { statusCode: StatusCodes.OK, body: client };
  } catch (error: any) {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      body: error.message,
    };
  }
};
