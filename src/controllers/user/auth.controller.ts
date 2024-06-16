import { StatusCodes } from 'http-status-codes';
import { UserData, UserProps } from '../../models/user';
import { HttpRequest, HttpResponse } from '../protocols';
import { AuthUserSchema } from '../../utils/zod/schemas';
import { AuthUserRepository} from '../../repositories/user/auth.repository';

export const AuthUserController = async (
  params: HttpRequest<UserProps>
): Promise<HttpResponse<UserData | string>> => {
  try {
    const body = AuthUserSchema.safeParse(params.body);
    if (!body.success)
      return {
        statusCode: StatusCodes.CONFLICT,
        body: 'Preencha os campos corretamente',
      };
    const user = await AuthUserRepository(body.data);
    return { statusCode: StatusCodes.CREATED, body: user };
  } catch (error: any) {
    return {
      statusCode: StatusCodes.UNAUTHORIZED,
      body: error.message,
    };
  }
};
