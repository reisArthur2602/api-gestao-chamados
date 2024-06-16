import { StatusCodes } from 'http-status-codes';
import { UserData, UserProps } from '../../models/user';
import { CreateUserSchema } from '../../utils/zod/schemas';
import { HttpRequest, HttpResponse } from '../protocols';
import { CreateUserRepository } from '../../repositories/user/create.repository';

export const CreateUserController = async (
  params: HttpRequest<UserProps>
): Promise<HttpResponse<Omit<UserData, 'token'> | string>> => {
  try {
    const body = CreateUserSchema.safeParse(params.body);
    if (!body.success)
      return {
        statusCode: StatusCodes.CONFLICT,
        body: 'Preencha os campos corretamente',
      };

    const user = await CreateUserRepository(body.data);
    return { statusCode: StatusCodes.CREATED, body: user };
  } catch (error: any) {
    return {
      statusCode: StatusCodes.CONFLICT,
      body: error.message,
    };
  }
};
