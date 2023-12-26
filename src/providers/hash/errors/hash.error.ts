type nameHashError = "EmptySaltRounds";

const schemaError = {
  EmptySaltRounds: {
    statusCode: 500,
    message: "Salt rounds is required",
  },
};

export class HashError extends Error {
  public readonly nameError: nameHashError;
  public readonly statusCode: number;
  constructor(nameError: nameHashError) {
    super(schemaError[nameError].message);
    this.nameError = nameError;
    this.statusCode = schemaError[nameError].statusCode;
  }
}
