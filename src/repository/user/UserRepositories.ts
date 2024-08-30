import { db } from '../../database/Client';
import { ICreateUser } from '../../domain/models/user/ICreateUser';
import { IFindByEmail } from '../../domain/models/user/IFindByEmail';
import { IFindById } from '../../domain/models/user/IFindById';
import { IUser } from '../../domain/models/user/IUser';
import { IUserRepository } from '../../domain/repository/IUserRepository';

class UserRepository implements IUserRepository {
    async create({ email, password, username }: ICreateUser): Promise<IUser> {
        const user = await db.user.create({
            data: { email, password, username },
        });
        return user;
    }

    async findbyEmail({ email }: IFindByEmail): Promise<IUser | null> {
        const user = await db.user.findUnique({ where: { email } });
        return user;
    }

    async findbyId({ id }: IFindById): Promise<IUser | null> {
        const user = await db.user.findUnique({ where: { id } });
        return user;
    }
}
export default UserRepository;
