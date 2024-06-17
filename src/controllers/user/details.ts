import { StatusCodes } from 'http-status-codes';
import { UserData } from '../../models/user';
import { HttpRequest, HttpResponse } from '../http';
import { DetailsUserRepository } from '../../repositories/user/details';

export const DetailsUserController = async (
  params: HttpRequest<any>
): Promise<HttpResponse<Omit<UserData, 'token'> | string>> => {
  try {
    const id = params.userId as string;
    const user = await DetailsUserRepository(id);
    return { statusCode: StatusCodes.ACCEPTED, body: user };
  } catch (error: any) {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      body: error.message,
    };
  }
};
