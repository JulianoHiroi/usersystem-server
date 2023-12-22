import { UserRepository } from "../user.repository";

import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaRepository implements UserRepository {
  async createUser(data: User): Promise<User> {
    const user = await prisma.user.create({ data });
    return user;
  }
  async findUser(email?: string, id?: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
        id,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }
}
