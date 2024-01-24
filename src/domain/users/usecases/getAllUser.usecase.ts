import UserRepository from "../../../infra/repositories/user.repository";
import { NodeMailerMailService } from "../../../infra/providers/email/implementations/nodemailer.service";

type GetAllUserResponse = {
  id: string;
  name: string;
  email: string;
  date_of_birth: Date;
  gender: string;
}[];
class GetAllUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  
  async execute(): Promise<GetAllUserResponse> {
    const users = await this.userRepository.findAll();
    const allUsers = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        date_of_birth: user.date_of_birth,
      };
    });
    return allUsers;
  }
}
export default GetAllUserUseCase;
