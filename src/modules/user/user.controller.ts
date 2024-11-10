import { compare, hash } from "bcryptjs";
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../../helpers/error";
import UserRepository, { IUserRepository } from "./user.repository";
import {
  SessionUserRequest,
  SessionUserResponse,
  UserRequest,
  UserResponse,
} from "./user.types";
import { sign } from "jsonwebtoken";

class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  private userRepository: IUserRepository;

  async create(data: UserRequest): Promise<void> {
    const hasUserWithEmail = await this.userRepository.findbyEmail(data.email);

    if (hasUserWithEmail) {
      throw new ConflictError("EMAIL_ALREADY_EXISTS");
    }

    const passwordHash = await hash(data.password, 8);

    const user = await this.userRepository.create({
      ...data,
      password: passwordHash,
    });

    return user;
  }

  async session(data: SessionUserRequest): Promise<SessionUserResponse> {
    const hasUserWithEmail = await this.userRepository.findbyEmail(data.email);

    if (!hasUserWithEmail)
      throw new NotFoundError('USER_NOT_FOUND');

    const passwordMatch = await compare(
      data.password,
      hasUserWithEmail.password
    );

    if (!passwordMatch) {
      throw new UnauthorizedError("PASSWORD_INCORRECT");
    }

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

  async details(id: string): Promise<UserResponse | null> {
    const user = await this.userRepository.findbyId(id);
    return user;
  }
}
export default UserController;
