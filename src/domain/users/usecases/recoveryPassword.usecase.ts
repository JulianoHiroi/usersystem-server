import { EmailService } from "../../../infra/providers/email/email.service";
import { EmailError } from "../../../infra/providers/email/error/email.error";
import TokenService from "../../../infra/providers/token/token.service";
import UserRepository from "../../../infra/repositories/user.repository";
import UserError from "../errors/user.errors";

class RecoveryPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService
  ) {}
  async execute(email: string) {
    const user = await this.userRepository.findUser({
      email: email,
    });
    if (!user) {
      throw new UserError("notFound");
    }
    if (!this.emailService.verifyConnection()) {
      throw new EmailError("connectionError");
    }
    const token = this.tokenService.sign({ id: user.id }, { expiresIn: "1d" });

    const recoveryLink = `localhost:3000/recoverypassword/${token}`;

    this.emailService.sendEmail({
      to: user.email,
      subject: "Recuperação de senha",
      html: ` <h2>Recuperação de senha</h2>
      <p>
        Você está recebendo este email porque utilizou a opção para recuperar a sua senha do USerSystem. Se você não solicitou uma alteração de senha, ignore este email.
        <br />
        <br />
        Clique <a href=${`http://localhost:3000/recovery-password/${token}`}>aqui</a> para alterar a sua senha.
      </p>`,
    });
  }
}

export default RecoveryPasswordUseCase;
