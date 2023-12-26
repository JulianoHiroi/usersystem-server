type NameTokenError = "EmptySecret";

const schemaTokenError = {
  EmptySecret: {
    statusCode: 500,
    message: "Empty secret",
  },
};

export class TokenError extends Error {
  public readonly nameError: NameTokenError;
  public readonly statusCode: number;
  constructor(nameError: NameTokenError) {
    super(schemaTokenError[nameError].message);
    this.nameError = nameError;
    this.statusCode = schemaTokenError[nameError].statusCode;
  }
}
