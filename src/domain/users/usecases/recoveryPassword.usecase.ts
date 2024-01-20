import UserRepository from "../../../infra/repositories/user.repository";
import UserError from "../errors/user.errors";

class RecoveryPasswordUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(email: string) {
    const user = await this.userRepository.findUser({
      email: email,
    });
    if (!user) {
      throw new UserError("notFound");
    }
  }
}

export default RecoveryPasswordUseCase;
