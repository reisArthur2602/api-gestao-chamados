import { StatusCodes } from 'http-status-codes';
import { UserData } from '../../models/user';
import { HttpResponse } from '../protocols';
import { DetailsUserRepository } from '../../repositories/user/details.repository';

export const DetailsUserController = async (
  userid: string
): Promise<HttpResponse<Omit<UserData, 'token'> | string>> => {
  try {
    const user = await DetailsUserRepository(userid);
    return { statusCode: StatusCodes.CREATED, body: user };
  } catch (error: any) {
    return {
      statusCode: StatusCodes.UNAUTHORIZED,
      body: error.message,
    };
  }
};
