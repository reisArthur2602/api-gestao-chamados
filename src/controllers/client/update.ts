import { StatusCodes } from 'http-status-codes';
import { ClientData, ClientProps } from '../../models/client';
import { HttpRequest, HttpResponse } from '../http';
import { UpdateClientRepository } from '../../repositories/client/update';

export const UpdateClientController = async (
  params: HttpRequest<Partial<ClientProps>>
): Promise<HttpResponse<ClientData | string>> => {
  try {
    const id = params.params as string;
    const body = params.body;

    if (!id || !body) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: 'Preencha os campos corretamente',
      };
    }

    const client = await UpdateClientRepository(id, body);

    return { statusCode: StatusCodes.OK, body: client };
  } catch (error: any) {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      body: error.message,
    };
  }
};
