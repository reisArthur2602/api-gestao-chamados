import { StatusCodes } from 'http-status-codes';
import { HttpRequest, HttpResponse } from '../http';
import { ClientData, ClientProps, ClientSchema } from '../../models/client';
import { CreateClientRepository } from '../../repositories/client/create';


export const CreateClientController = async (
  params: HttpRequest<ClientProps>
): Promise<HttpResponse<ClientData | string>> => {
  try {
    const body = ClientSchema.safeParse(params.body);
    if (!body.success)
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: 'Preencha os campos corretamente',
      };

    const client = await CreateClientRepository(body.data);

    return { statusCode: StatusCodes.CREATED, body: client };
  } catch (error: any) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      body: error.message,
    };
  }
};
