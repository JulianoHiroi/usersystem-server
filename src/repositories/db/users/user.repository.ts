import { User } from "@prisma/client";
import {
  CreateUserDTO,
  updateUserDTO,
} from "../../../domain/users/@types/userDTO";
export abstract class UserRepository {
  abstract findUser(email?: string, id?: string): Promise<User | null>;
  abstract createUser(data: CreateUserDTO): Promise<User>;
  abstract deleteUser(id: string): Promise<void>;
  abstract updateUser(data: updateUserDTO): Promise<User>;
}
