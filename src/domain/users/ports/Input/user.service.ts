import {
  CreateUserDTO,
  SiginUserDTO,
  getUserResponseDTO,
  updateUserDTO,
} from "../../@types/userDTO";

export abstract class UserService {
  abstract getUser(id: string): Promise<getUserResponseDTO>;
  abstract signIn(data: SiginUserDTO): Promise<string>;
  abstract signUp(data: CreateUserDTO): Promise<string>;
  abstract updateUser(data: updateUserDTO): Promise<void>;
  abstract deleteUser(id: string): Promise<void>;
}
