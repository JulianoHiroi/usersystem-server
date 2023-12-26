import { User } from "@prisma/client";
import {
  CreateUserDTO,
  FindUserDTO,
  getUserResponseDTO,
  updateUserDTO,
} from "../../../domain/users/@types/userDTO";
export abstract class UserRepository {
  abstract findUser(findUserDTO: FindUserDTO): Promise<User | null>;
  abstract createUser(data: CreateUserDTO): Promise<User>;
  abstract deleteUser(id: string): Promise<void>;
  abstract updateUser(data: updateUserDTO): Promise<User>;
}
