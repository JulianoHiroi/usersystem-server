import HashServiceBcryp from "../../../../infra/providers/hash/implementations/hashBcrypt.service";
import TokenServiceJWT from "../../../../infra/providers/token/implementations/tokenJWT.service";
import PrismaRepository from "../../../../infra/repositories/implementations/user.prisma.repository";
import { getUserResponseDTO } from "../../@types/userDTO";
import DeleteUserUseCase from "../../usecases/deleteUser.usecase";
import GetAllUserUseCase from "../../usecases/getAllUser.usecase";
import GetUserUseCase from "../../usecases/getUser.usecase";
import SigninUseCase from "../../usecases/signIn.usecase";
import SignUpUseCase from "../../usecases/signUp.usecase";
import UpdateUserUseCase from "../../usecases/updateUser.usecase";
import UserService from "../user.service";

const userRepository = new PrismaRepository();
const hashServiceBcrypt = new HashServiceBcryp();
const tokenServiceJWT = new TokenServiceJWT();
class UserDomainService implements UserService {
  private getUserUseCase: GetUserUseCase = new GetUserUseCase(userRepository);
  private updateUserUseCase: UpdateUserUseCase = new UpdateUserUseCase(
    userRepository
  );
  private deleteUserUseCase: DeleteUserUseCase = new DeleteUserUseCase(
    userRepository
  );
  private signInUseCase: SigninUseCase = new SigninUseCase(
    userRepository,
    hashServiceBcrypt,
    tokenServiceJWT
  );
  private signUpUseCase: SignUpUseCase = new SignUpUseCase(
    userRepository,
    hashServiceBcrypt,
    tokenServiceJWT
  );
  private getAllUsersUseCase: GetAllUserUseCase = new GetAllUserUseCase(
    userRepository
  );

  async getUser(id: string): Promise<getUserResponseDTO> {
    const user = await this.getUserUseCase.execute(id);
    return user;
  }
  async getAllUsers() {
    const users = await this.getAllUsersUseCase.execute();
    return users;
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
    const updateUser = await this.updateUserUseCase.execute(data);
    return updateUser;
  }
  async deleteUser(id: string) {
    await this.deleteUserUseCase.execute(id);
  }
}
export default UserDomainService;
