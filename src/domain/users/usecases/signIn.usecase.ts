import { UserError } from "../errors/user.errors";
import { UserRepository } from "../../../repositories/db/users/user.repository";
import { HashService } from "../../../providers/hash/hash.service";
import { TokenService } from "../../../providers/token/token.service";

type SigninProps = {
  email: string;
  password: string;
};

export class SigninUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService
  ) {}

  async execute(data: SigninProps): Promise<string> {
    const user = await this.userRepository.findUser({ email: data.email });

    if (!user) {
      throw new UserError("notFound");
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
