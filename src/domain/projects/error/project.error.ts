type nameProjectError = "notFound";
const schemaProjectError = {
  notFound: {
    statusCode: 404,
    message: "Project not found",
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
