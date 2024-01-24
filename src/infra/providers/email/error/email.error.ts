type nameEmailError = "notConfigured" | "connectionError";

const schemaError = {
  notConfigured: {
    statusCode: 500,
    message: "Email service not configured",
  },
  connectionError: {
    statusCode: 500,
    message: "Email service not configured",
  },
};

export class EmailError extends Error {
  public readonly nameError: nameEmailError;
  public readonly statusCode: number;
  constructor(nameError: nameEmailError) {
    super(schemaError[nameError].message);
    this.nameError = nameError;
    this.statusCode = schemaError[nameError].statusCode;
  }
}
