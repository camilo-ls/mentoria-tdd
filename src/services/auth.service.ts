import { InvalidParamError } from "../shared/errors/invalid-param.error";
import { success } from "../shared/http-helpers/success.helper";
import { unauthorized } from "../shared/http-helpers/unauthorized.helper";

// This is a mock authentication service
// It should be replaced by a real service that communicates with a database
// and its methods should return promises or be async

const fakeUser = {
  email: "valid_email@example.com",
  password: "valid_password",
};

export class AuthService {
  login(httpRequest: any): any {
    if (!httpRequest.body.email || !httpRequest.body.password) {
      return Error("missing-credentials");
    }

    if (
      httpRequest.body.email !== fakeUser.email ||
      httpRequest.body.password !== fakeUser.password
    ) {
      return unauthorized(new InvalidParamError("credentials"));
    }

    if (
      httpRequest.body.email === fakeUser.email ||
      httpRequest.body.password === fakeUser.password
    ) {
      return success({ token: "valid_token" });
    }
  }
}
