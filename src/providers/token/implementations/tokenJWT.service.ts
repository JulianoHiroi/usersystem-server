import { TokenError } from "../errors/token.error";
import jwt from "jsonwebtoken";
import TokenService, { generateTokenOptions } from "../token.service";

class TokenServiceJWT implements TokenService {
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

export default TokenServiceJWT;
