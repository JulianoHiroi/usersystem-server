import {
  FindUserDTO,
  updateUserDTO,
} from "../../../domain/users/@types/userDTO";
import UserRepository from "../user.repository";

import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

class UserPrismaRepository implements UserRepository {
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
    const projects = await prisma.userProject.findMany({
      where: {
        userId: id,
        role: "owner"
      },
    });
    await prisma.userProject.deleteMany({
      where: {
        userId: id,
        role: "owner"
      },
    });
    if(projects && projects.length > 0){
      projects.forEach(async (project) => {
        await prisma.project.delete({
          where: {
            id: project.projectId,
          },
        });
      });
    } 
    await prisma.userProject.deleteMany({
      where: {
        userId: id,
        role: "owner",
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
  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany({ include: { projects: true } });
    return users;
  }
}

export default UserPrismaRepository;
