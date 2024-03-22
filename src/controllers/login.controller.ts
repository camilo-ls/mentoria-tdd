import { MissingParamError } from "../shared/errors/missing-param.error";
import { badRequest } from "../shared/http-helpers/bad-request.helper";
import { validateEmail } from "../shared/utils/validate-email.util";
import { InvalidParamError } from "../shared/errors/invalid-param.error";

export class LoginController {
  constructor(private readonly authService: any) {
    this.authService = authService;
  }

  login(httpRequest: any): any {
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError("email"));
    }

    if (!httpRequest.body.password) {
      return badRequest(new MissingParamError("password"));
    }

    if (!validateEmail(httpRequest.body.email)) {
      return badRequest(new InvalidParamError("email"));
    }

    return this.authService.login(httpRequest);
  }
}
