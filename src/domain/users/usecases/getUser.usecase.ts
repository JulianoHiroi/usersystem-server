import { UserError } from "../errors/user.errors";
import { UserRepository } from "../../../repositories/db/users/user.repository";

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id?: string, email?: string) {
    const user = await this.userRepository.findUser(id, email);

    if (!user) {
      throw new UserError("notFound");
    }

    return user;
  }
}
