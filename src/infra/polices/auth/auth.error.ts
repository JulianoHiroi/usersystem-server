type nameAuthError = "Unauthorized" | "invalidToken" | "expiredToken";

const schemaAuthError = {
  Unauthorized: {
    statusCode: 401,
    message: "Invalid authorization",
  },
  invalidToken: {
    statusCode: 401,
    message: "Invalid token",
  },
  expiredToken: {
    statusCode: 401,
    message: "Expired token",
  },
};

export class AuthError extends Error {
  public readonly nameError: nameAuthError;
  public readonly statusCode: number;
  constructor(nameError: nameAuthError) {
    super(schemaAuthError[nameError].message);
    this.nameError = nameError;
    this.statusCode = schemaAuthError[nameError].statusCode;
  }
}
