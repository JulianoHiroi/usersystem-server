import UserRepository from "../../../infra/repositories/user.repository";
import User from "../entity/user.entity";
import UserMapper from "../mappers/user.mapper";
import UserError from "../errors/user.errors";
import TokenService from "../../../infra/providers/token/token.service";
import HashService from "../../../infra/providers/hash/hash.service";
import { GetUserResponse } from "./getUser.usecase";
type SignUpProps = {
  name: string;
  email: string;
  password: string;
  date_of_birth: Date;
  gender: string;
};
type SignupResponse = {
  token: string;
  user: GetUserResponse;
}
class SignUpUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService
  ) {}

  async execute(data: SignUpProps): Promise<SignupResponse> {
    const userAlreadyExists = await this.userRepository.findUser({
      email: data.email,
    });

    if (userAlreadyExists) {
      throw new UserError("alreadyExists");
    }
    if(data.date_of_birth === undefined || data.date_of_birth === null){
      throw new UserError("invalidDateBirth");
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
    const newUser = await this.userRepository.createUser(mappedUser);
    const token = this.tokenService.sign({ id: user.id }, { expiresIn: "1d" });
    return {
      token : token, 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        date_of_birth: user.date_of_birth,
      }
    }
  }
}
export default SignUpUseCase;
