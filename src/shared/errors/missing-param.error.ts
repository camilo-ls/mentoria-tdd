export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`missing-${paramName}`);
    this.name = "MissingParamError";
  }
}
