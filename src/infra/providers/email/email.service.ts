export type SendEmailDTO = {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
};

export abstract class EmailService {
  /**
   * Verifica se está conectado ao servidor do provedor de e-mail configurado.
   * @returns Retorna `true` se estiver conectado, `false` caso contrário
   */
  verifyConnection: () => Promise<boolean>;

  /**
   * Envia um e-mail utilizando o provedor de e-mail configurado.
   * @param props Objeto contento as configurações para o envio do e-mail, como destinatário, assunto e corpo da mensagem
   * @return Retorna void
   */
  sendEmail: (sendEmailDTO: SendEmailDTO) => Promise<void>;
}
