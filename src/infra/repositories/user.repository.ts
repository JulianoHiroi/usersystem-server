import { User } from "@prisma/client";
import {
  CreateUserDTO,
  FindUserDTO,
  updateUserDTO,
} from "../../domain/users/@types/userDTO";
abstract class UserRepository {
  abstract findUser(findUserDTO: FindUserDTO): Promise<User | null>;
  abstract createUser(data: CreateUserDTO): Promise<User>;
  abstract deleteUser(id: string): Promise<void>;
  abstract updateUser(data: updateUserDTO): Promise<User>;
  abstract findAll(): Promise<User[]>;
}

export default UserRepository;
