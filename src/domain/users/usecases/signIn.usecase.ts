import { UserError } from "../errors/user.errors";
import { UserRepository } from "../../../repositories/db/users/user.repository";

type SigninProps = {
  email: string;
  password: string;
};

export class SigninUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: SigninProps) {
    const user = await this.userRepository.findUser(data.email);

    if (!user) {
      throw new UserError("notFound");
    }

    const passwordMatch = await compare(data.password, user.password);

    return { token };
  }
}
