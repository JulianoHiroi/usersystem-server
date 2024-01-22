import HashServiceBcryp from "../../../../infra/providers/hash/implementations/hashBcrypt.service";
import TokenServiceJWT from "../../../../infra/providers/token/implementations/tokenJWT.service";
import PrismaRepository from "../../../../infra/repositories/implementations/user.prisma.repository";
import ProjectPrismaRepository from "../../../../infra/repositories/implementations/project.prisma.repository";
import { getUserResponseDTO } from "../../@types/userDTO";
import DeleteUserUseCase from "../../usecases/deleteUser.usecase";
import GetAllUserUseCase from "../../usecases/getAllUser.usecase";
import GetUserUseCase from "../../usecases/getUser.usecase";
import SigninUseCase from "../../usecases/signIn.usecase";
import SignUpUseCase from "../../usecases/signUp.usecase";
import UpdateUserUseCase from "../../usecases/updateUser.usecase";
import GetUserByEmailUseCase from "../../usecases/getUserByEmail.usecase";
import GetAllProjectsByUserUseCase from "../../usecases/getAllProjectsByUser.usecase";
import UserService from "../user.service";
import RecoveryPasswordUseCase from "../../usecases/recoveryPassword.usecase";
import { NodeMailerMailService } from "../../../../infra/providers/email/implementations/nodemailer.service";
import ChangePasswordUseCase from "../../usecases/changePassword.usecase";

const userRepository = new PrismaRepository();
const hashServiceBcrypt = new HashServiceBcryp();
const tokenServiceJWT = new TokenServiceJWT();
const projectRepository = new ProjectPrismaRepository();
const emailService = new NodeMailerMailService();

class UserDomainService implements UserService {
  private getUserUseCase: GetUserUseCase = new GetUserUseCase(userRepository);
  private updateUserUseCase: UpdateUserUseCase = new UpdateUserUseCase(
    userRepository
  );
  private getUserByEmailUseCase: GetUserByEmailUseCase =
    new GetUserByEmailUseCase(userRepository);
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
  private getAllProjectsByUserUseCase: GetAllProjectsByUserUseCase =
    new GetAllProjectsByUserUseCase(projectRepository, userRepository);

  private recoveryPasswordUseCase: RecoveryPasswordUseCase =
    new RecoveryPasswordUseCase(userRepository, emailService, tokenServiceJWT);

  private changePasswordUseCase: ChangePasswordUseCase =
    new ChangePasswordUseCase(
      userRepository,
      tokenServiceJWT,
      hashServiceBcrypt
    );

  async getUser(id: string): Promise<getUserResponseDTO> {
    const user = await this.getUserUseCase.execute(id);
    return user;
  }

  async getAllUsers() {
    const users = await this.getAllUsersUseCase.execute();
    return users;
  }
  async getAllProjectsByUser(id: string) {
    const projects = await this.getAllProjectsByUserUseCase.execute(id);
    return projects;
  }

  async getUserByEmail(email: string) {
    const user = await this.getUserByEmailUseCase.execute(email);
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
    const response = await this.signUpUseCase.execute(data);
    return response;
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
  async recoveryPassword(email: string) {
    await this.recoveryPasswordUseCase.execute(email);
  }
  async changePassword(data: { token: string; password: string }) {
    await this.changePasswordUseCase.execute(data);
  }
}
export default UserDomainService;
