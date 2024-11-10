import { compare, hash } from "bcryptjs";
import { ICreateSessionUser } from "../../domain/models/user/ICreateSessionUser";
import { ICreateUser } from "../../domain/models/user/ICreateUser";
import { IUser } from "../../domain/models/user/IUser";
import { IUserAuthenticated } from "../../domain/models/user/IUserAuthenticated";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../../helpers/error";
import UserRepository from "../../repository/user/UserRepositories";
import { sign } from "jsonwebtoken";
import { IFindById } from "../../domain/models/user/IFindById";

class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  private userRepository: IUserRepository;

  async create({ email, password, username }: ICreateUser): Promise<IUser> {
    const hasUserWithEmail = await this.userRepository.findbyEmail({ email });

    if (hasUserWithEmail)
      throw new ConflictError("Este email já está associado a um usuário");

    const passwordHash = await hash(password, 8);

    const user = await this.userRepository.create({
      email,
      password: passwordHash,
      username,
    });

    return user;
  }

  async session({
    email,
    password,
  }: ICreateSessionUser): Promise<IUserAuthenticated> {
    const hasUserWithEmail = await this.userRepository.findbyEmail({ email });

    if (!hasUserWithEmail)
      throw new NotFoundError("O Usuário não foi encontrado");

    const passwordMatch = await compare(password, hasUserWithEmail.password);

    if (!passwordMatch) throw new UnauthorizedError("A senha está incorreta");

    const keyJWT = process.env.JWT_SECRET as string;

    const token = sign(
      {
        name: hasUserWithEmail.username,
        email: hasUserWithEmail.email,
      },
      keyJWT,
      { subject: hasUserWithEmail.id, expiresIn: "7d" }
    );

    return {
      user: hasUserWithEmail,
      token,
    };
  }

  async details({ id }: IFindById): Promise<IUser | null> {
    const user = await this.userRepository.findbyId({ id });
    return user;
  }
}
export default UserController;
