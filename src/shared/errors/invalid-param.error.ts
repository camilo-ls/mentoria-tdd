export class InvalidParamError extends Error {
  constructor(paramName: string) {
    super(`invalid-${paramName}`);
    this.name = "InvalidParamError";
  }
}
