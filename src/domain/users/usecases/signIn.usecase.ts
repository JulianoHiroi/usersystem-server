import UserError from "../errors/user.errors";
import UserRepository from "../../../infra/repositories/user.repository";
import TokenService from "../../../infra/providers/token/token.service";
import HashService from "../../../infra/providers/hash/hash.service";
import { GetUserResponse } from "./getUser.usecase";

type SignInProps = {
  email: string;
  password: string;
};
type SigninResponse = {
  token: string;
  user: GetUserResponse;
  }

class SigninUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService
  ) {}

  async execute(data: SignInProps): Promise<SigninResponse> {
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
    const response = {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        date_of_birth: user.date_of_birth,
      }
    }
    
    return response;
  }
}
export default SigninUseCase;
