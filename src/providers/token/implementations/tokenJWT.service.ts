import { TokenError } from "../errors/token.error";
import jwt from "jsonwebtoken";
import { generateTokenOptions, TokenService } from "../token.service";

export class TokenServiceJWT implements TokenService {
  public sign(payload: object, { expiresIn }: generateTokenOptions) {
    if (!process.env.SECRET) {
      throw new TokenError("EmptySecret");
    }
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn });
    return token;
  }

  public verify(token: string) {
    if (!process.env.SECRET) {
      throw new TokenError("EmptySecret");
    }
    const payload = jwt.verify(token, process.env.SECRET);
    return payload;
  }
}
