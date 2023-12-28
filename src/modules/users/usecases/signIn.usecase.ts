import UserError from "../errors/user.errors";
import UserRepository from "../repositories/user.repository";
import HashService from "../../../providers/hash/hash.service";
import TokenService from "../../../providers/token/token.service";

type SignInProps = {
  email: string;
  password: string;
};

class SigninUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService
  ) {}

  async execute(data: SignInProps): Promise<string> {
    const user = await this.userRepository.findUser({ email: data.email });

    if (!user) {
      throw new UserError("invalidCredentials");
    }

    const passwordMatch = this.hashService.compare(
      data.password,
      user.password
    );
    if (!passwordMatch) {
      throw new UserError("invalidCredentials");
    }
    const token = this.tokenService.sign({ id: user.id }, { expiresIn: "1d" });
    return token;
  }
}
export default SigninUseCase;
