type nameProjectError = "notFound" | "notOwner" | "userAlreadyConnected" | "invalidParams";
const schemaProjectError = {
  notFound: {
    statusCode: 404,
    message: "Project not found",
  },
  notOwner: {
    statusCode: 401,
    message: "You are not the owner of this project",
  },
  userAlreadyConnected: {
    statusCode: 400,
    message: "User already connected to this project",
  }, 
  invalidParams: {
    statusCode: 400,
    message: "Invalid params",
  }
};
class ProjectError extends Error {
  public readonly nameError: nameProjectError;
  public readonly statusCode: number;
  constructor(nameError: nameProjectError) {
    super(schemaProjectError[nameError].message);
    this.nameError = nameError;
    this.statusCode = schemaProjectError[nameError].statusCode;
  }
}
export default ProjectError;
