import UserError from "../errors/user.errors";
import UserRepository from "../../../infra/repositories/user.repository";

class DeleteUserUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findUser({ id: id });
    if (!user) {
      throw new UserError("notFound");
    }
    await this.userRepository.deleteUser(id);
  }
}
export default DeleteUserUseCase;
