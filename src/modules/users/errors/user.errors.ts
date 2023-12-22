type nameError =
  | "notFound"
  | "invalidPassword"
  | "invalidEmail"
  | "emptyName"
  | "invalidDateBirth"
  | "emptyGender"
  | "alreadyExists";

const schemaError = {
  notFound: {
    statusCode: 404,
    message: "User not found",
  },
  invalidPassword: {
    statusCode: 400,
    message: "Invalid password",
  },
  invalidEmail: {
    statusCode: 400,
    message: "Invalid email",
  },
  emptyName: {
    statusCode: 400,
    message: "Name is required",
  },
  invalidDateBirth: {
    statusCode: 400,
    message: "Invalid date of birth or date of birth is required",
  },
  emptyGender: {
    statusCode: 400,
    message: "Gender is required",
  },
  alreadyExists: {
    statusCode: 400,
    message: "User already exists",
  },
};
export class UserError extends Error {
  public readonly nameError: nameError;
  public readonly statusCode: number;
  constructor(nameError: nameError) {
    super(schemaError[nameError].message);
    this.nameError = nameError;
    this.statusCode = schemaError[nameError].statusCode;
    console.log(this.statusCode);
  }
}
