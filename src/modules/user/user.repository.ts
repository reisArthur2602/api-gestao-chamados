import { db } from "../../database/prisma";
import { UserRequest, UserResponse } from "./user.types";

export interface IUserRepository {
  create(data: UserRequest): Promise<void>;
  findbyEmail(email: string): Promise<UserResponse | null>;
  findbyId(id: string): Promise<UserResponse | null>;
}

class UserRepository implements IUserRepository {
  async create(data: UserRequest): Promise<void> {
    await db.user.create({ data });
  }

  async findbyEmail(email: string): Promise<UserResponse | null> {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  }

  async findbyId(id: string): Promise<UserResponse | null> {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  }
}
export default UserRepository;
