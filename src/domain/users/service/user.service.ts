import { GetProjectDTO } from "../../projects/@types/projectDTO";
import {
  SignInDTO,
  SignUpDTO,
  getUserResponseDTO,
  updateUserDTO,
  SignInResponseDTO,
  SignUpResponseDTO,
  changePasswordDTO,
} from "../@types/userDTO";

abstract class UserService {
  abstract getUser(id: string): Promise<getUserResponseDTO>;
  abstract signIn(data: SignInDTO): Promise<SignInResponseDTO>;
  abstract signUp(data: SignUpDTO): Promise<SignUpResponseDTO>;
  abstract updateUser(data: updateUserDTO): Promise<getUserResponseDTO>;
  abstract deleteUser(id: string): Promise<void>;
  abstract getAllUsers(): Promise<getUserResponseDTO[]>;
  abstract getAllProjectsByUser(id: string): Promise<GetProjectDTO[]>;
  abstract getUserByEmail(email: string): Promise<getUserResponseDTO>;
  abstract recoveryPassword(email: string): Promise<void>;
  abstract changePassword(data: changePasswordDTO): Promise<void>;
}

export default UserService;
