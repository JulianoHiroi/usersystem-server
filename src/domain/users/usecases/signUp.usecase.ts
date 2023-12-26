import { CreateUserDTO } from "../@types/userDTO";
import { UserRepository } from "../../../repositories/db/users/user.repository";
import User from "../domain/user.entity";
import { UserMapper } from "../mappers/user.mapper";
import { UserError } from "../errors/user.errors";
import { TokenService } from "../../../providers/token/token.service";
import { HashService } from "../../../providers/hash/hash.service";

type createUserProps = {
  name: string;
  email: string;
  password: string;
  date_of_birth: string;
  gender: string;
};
export class SignUpUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly hashService: HashService
  ) {}

  async execute(data: CreateUserDTO): Promise<string> {
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
