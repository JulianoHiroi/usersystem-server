import HashService from "../../../infra/providers/hash/hash.service";
import TokenService from "../../../infra/providers/token/token.service";
import UserRepository from "../../../infra/repositories/user.repository";
import User from "../entity/user.entity";
import UserError from "../errors/user.errors";

type payloadProps = {
  id: string;
};

type changePasswordProps = {
  token: string;
  password: string;
};

class ChangePasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly hashService: HashService
  ) {}

  async execute({ token, password }: changePasswordProps): Promise<void> {
    const payload: payloadProps = this.tokenService.verify(
      token
    ) as payloadProps;
    if (
      payload === undefined ||
      payload === null ||
      payload.id === undefined ||
      payload.id === null
    ) {
      throw new UserError("invalidToken");
    }
    const user = await this.userRepository.findUser({ id: payload.id });
    if (!user) {
      throw new Error("User not found");
    }
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;
    if (!regex.test(password)) {
      throw new UserError("invalidPassword");
    }
    const hashPassword = this.hashService.hash(password);
    const updateUser = await this.userRepository.updateUser({
      id: user.id,
      password: hashPassword,
    });
    return;
  }
}
export default ChangePasswordUseCase;
