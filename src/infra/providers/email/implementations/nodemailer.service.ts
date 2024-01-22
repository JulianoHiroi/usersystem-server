import { EmailService, SendEmailDTO } from "../email.service";
import { createTransport, Transporter } from "nodemailer";

export type NodeMailerMailServiceProps = {
  config: {
    host: string;
    port: number;
    user: string;
    password: string;
    email: string;
  };
};

const nodemailer = require("nodemailer");

const emailService: string = process.env.EMAIL_SERVICE as string;
const emailHost: string = process.env.EMAIL_HOST as string;
const emailPort: string = process.env.EMAIL_PORT as string;
const emailSecure: string = process.env.EMAIL_SECURE as string;
const emailUser: string = process.env.EMAIL_USER as string;
const emailPassword: string = process.env.EMAIL_PASSWORD as string;

export class NodeMailerMailService implements EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: emailService,
      host: parseInt(emailHost, 10),
      port: emailPort,
      secure: emailSecure === "true" ? true : false,
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });
  }

  async verifyConnection(): Promise<boolean> {
    return this.transporter.verify();
  }

  async sendEmail(sendEmailDTO: SendEmailDTO): Promise<void> {
    const options = {
      ...sendEmailDTO,
      from: emailUser,
    };
    const response = await this.transporter.sendMail(options);
    if (response.rejected.length > 0) throw new Error("Email not sent");
  }
}
