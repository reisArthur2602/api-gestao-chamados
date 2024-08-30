import { ICreateUser } from '../../domain/models/user/ICreateUser';
import { IUser } from '../../domain/models/user/IUser';
import { IUserRepository } from '../../domain/repository/IUserRepository';
import { ConflictError } from '../../helpers/error';
import UserRepository from '../../repository/user/UserRepositories';

class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }
    private userRepository: IUserRepository;

    async create({ email, password, username }: ICreateUser): Promise<IUser> {
        const userExists = await this.userRepository.findbyEmail({ email });
        if (userExists)
            throw new ConflictError(
                'Este email já está associado a um usuário'
            );
        const user = await this.userRepository.create({
            email,
            password,
            username,
        });
        return user;
    }
}
export default UserController;
