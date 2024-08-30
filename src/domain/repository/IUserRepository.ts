import { ICreateUser } from '../models/user/ICreateUser';
import { IFindByEmail } from '../models/user/IFindByEmail';
import { IFindById } from '../models/user/IFindById';
import { IUser } from '../models/user/IUser';

export interface IUserRepository {
    create({ email, password, username }: ICreateUser): Promise<IUser>;
    findbyEmail({email}: IFindByEmail): Promise<IUser | null>;
    findbyId({id}: IFindById): Promise<IUser | null>;
}
