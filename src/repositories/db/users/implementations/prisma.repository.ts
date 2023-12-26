import {
  FindUserDTO,
  updateUserDTO,
} from "../../../../domain/users/@types/userDTO";
import { UserRepository } from "../user.repository";

import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaRepository implements UserRepository {
  async createUser(data: User): Promise<User> {
    const user = await prisma.user.create({ data });
    return user;
  }
  async findUser(findUserDTO: FindUserDTO): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: findUserDTO.email,
        id: findUserDTO.id,
      },
      include: {
        projects: true,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }
  async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
  async updateUser(data: updateUserDTO): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    });
    return user;
  }
}
