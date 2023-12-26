export interface generateTokenOptions {
  expiresIn: string;
}
export abstract class TokenService {
  abstract sign(payload: object, options?: generateTokenOptions): string;
  abstract verify(token: string): string | object;
}
