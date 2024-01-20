import { Request, Response, NextFunction } from "express";
import { AuthError } from "./auth.error";
import TokenService from "../../providers/token/token.service";
import UserRepository from "../../repositories/user.repository";

type UserTokenPayload = {
  id: string;
};
export interface AuthRequest extends Request {
  userId?: string;
}
export class AuthMiddleware {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository
  ) {}

  getToken(req: Request) {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new AuthError("Unauthorized");
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw new AuthError("Unauthorized");
    }

    if (!token) {
      throw new AuthError("invalidToken");
    }

    const tokenIsValid: UserTokenPayload = this.tokenService.verify(
      token
    ) as UserTokenPayload;
    if (!tokenIsValid.id) throw new AuthError("invalidToken");
    return tokenIsValid.id;
  }
  async auth(req: AuthRequest, res: Response, next: NextFunction) {
    const userId: string = this.getToken(req);
    const user = await this.userRepository.findUser({ id: userId });
    if (!user) throw new AuthError("Unauthorized");
    req.userId = userId;

    return next();
  }
}
