import UserRepository from "../../../infra/repositories/user.repository";
import User from "../entity/user.entity";
import UserMapper from "../mappers/user.mapper";
import UserError from "../errors/user.errors";
import TokenService from "../../../infra/providers/token/token.service";
import HashService from "../../../infra/providers/hash/hash.service";
type SignUpProps = {
  name: string;
  email: string;
  password: string;
  date_of_birth: Date;
  gender: string;
};

class SignUpUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService
  ) {}

  async execute(data: SignUpProps): Promise<string> {
    const userAlreadyExists = await this.userRepository.findUser({
      email: data.email,
    });

    if (userAlreadyExists) {
      throw new UserError("alreadyExists");
    }
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;
    if (!regex.test(data.password)) {
      throw new UserError("invalidPassword");
    }
    const hashPassword = this.hashService.hash(data.password);
    data.password = hashPassword;
    const user = new User(data);
    user.validadeUser();
    const mappedUser = UserMapper.toPersist(user);
    await this.userRepository.createUser(mappedUser);
    const token = this.tokenService.sign({ id: user.id }, { expiresIn: "1d" });
    return token;
  }
}
export default SignUpUseCase;
