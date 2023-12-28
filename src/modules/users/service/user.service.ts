import {
  SignInDTO,
  SignUpDTO,
  getUserResponseDTO,
  updateUserDTO,
} from "../@types/userDTO";

abstract class UserService {
  abstract getUser(id: string): Promise<getUserResponseDTO>;
  abstract signIn(data: SignInDTO): Promise<string>;
  abstract signUp(data: SignUpDTO): Promise<string>;
  abstract updateUser(data: updateUserDTO): Promise<getUserResponseDTO>;
  abstract deleteUser(id: string): Promise<void>;
  abstract getAllUsers(): Promise<getUserResponseDTO[]>;
}

export default UserService;
