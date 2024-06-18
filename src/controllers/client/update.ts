import { StatusCodes } from 'http-status-codes';
import {
  ClientData,
  UpdateClientProps,
  UpdateClientSchema,
} from '../../models/client';
import { HttpRequest, HttpResponse } from '../http';
import { UpdateClientRepository } from '../../repositories/client/update';

export const UpdateClientController = async (
  params: HttpRequest<UpdateClientProps>
): Promise<HttpResponse<ClientData | string>> => {
  try {
    const id = params.params as string;
    const body = UpdateClientSchema.safeParse({ ...params.body, id });
    console.log(body, params.body);

    if (!body.success)
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: 'Preencha os campos corretamente',
      };

    const client = await UpdateClientRepository(id, body.data);
    return { statusCode: StatusCodes.OK, body: client };
  } catch (error: any) {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      body: error.message,
    };
  }
};
