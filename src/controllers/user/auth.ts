import { StatusCodes } from 'http-status-codes';
import { AuthUserSchema, UserData, UserProps } from '../../models/user';
import { HttpRequest, HttpResponse } from '../http';
import { AuthUserRepository} from '../../repositories/user/auth';

export const AuthUserController = async (
  params: HttpRequest<UserProps>
): Promise<HttpResponse<UserData | string>> => {
  try {
    const body = AuthUserSchema.safeParse(params.body);
    if (!body.success)
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: 'Preencha os campos corretamente',
      };
    const user = await AuthUserRepository(body.data);
    return { statusCode: StatusCodes.ACCEPTED, body: user };
  } catch (error: any) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      body: error.message,
    };
  }
};
