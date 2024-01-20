type nameProjectError = "notFound" | "notOwner";
const schemaProjectError = {
  notFound: {
    statusCode: 404,
    message: "Project not found",
  },
  notOwner: {
    statusCode: 401,
    message: "You are not the owner of this project",
  },
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
