import { getUserResponseDTO } from "../../../@types/userDTO";
import DeleteUserUseCase from "../../../usecases/deleteUser.usecase";
import GetUserUseCase from "../../../usecases/getUser.usecase";
import SigninUseCase from "../../../usecases/signIn.usecase";
import SignUpUseCase from "../../../usecases/signUp.usecase";
import UpdateUserUseCase from "../../../usecases/updateUser.usecase";
import UserService from "../user.service";

class UserDomainService implements UserService {
  constructor(
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly signInUseCase: SigninUseCase,
    private readonly signUpUseCase: SignUpUseCase
  ) {}
  async getUser(id: string): Promise<getUserResponseDTO> {
    const user = await this.getUserUseCase.execute(id);
    return user;
  }
  async signIn(data: { email: string; password: string }) {
    const token = await this.signInUseCase.execute(data);
    return token;
  }
  async signUp(data: {
    email: string;
    password: string;
    name: string;
    gender: string;
    date_of_birth: Date;
  }) {
    const token = await this.signUpUseCase.execute(data);
    return token;
  }
  async updateUser(data: {
    id: string;
    email?: string;
    password?: string;
    name?: string;
    lastName?: string;
  }) {
    await this.updateUserUseCase.execute(data);
  }
  async deleteUser(id: string) {
    await this.deleteUserUseCase.execute(id);
  }
}
export default UserDomainService;
