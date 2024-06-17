import { StatusCodes } from 'http-status-codes';
import { CreateUserSchema, UserData, UserProps } from '../../models/user';

import { HttpRequest, HttpResponse } from '../http';
import { CreateUserRepository } from '../../repositories/user/create';

export const CreateUserController = async (
  params: HttpRequest<UserProps>
): Promise<HttpResponse<Omit<UserData, 'token'> | string>> => {
  try {
    const body = CreateUserSchema.safeParse(params.body);
    if (!body.success)
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: 'Preencha os campos corretamente',
      };

    const user = await CreateUserRepository(body.data);
    return { statusCode: StatusCodes.CREATED, body: user };
  } catch (error: any) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      body: error.message,
    };
  }
};
