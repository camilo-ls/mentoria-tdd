import { LoginController } from "./login.controller";
import { MissingParamError } from "../shared/errors/missing-param.error";
import { InvalidParamError } from "../shared/errors/invalid-param.error";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();
const sut = new LoginController(authService);

describe("LoginController", () => {
  let httpRequest = {};

  beforeEach(() => {
    // Reset httpRequest for each test to ensure tests are independent
    httpRequest = {
      body: {},
    };
  });

  test("Should return 400 if no email is provided", async () => {
    httpRequest["body"].password = "any_password";

    const httpResponse = await sut.login(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 if no password is provided", async () => {
    httpRequest["body"].email = "any_email@example.com";

    const httpResponse = await sut.login(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  test("Should return 400 for an invalid email format", async () => {
    httpRequest["body"] = {
      email: "invalid_email",
      password: "any_password",
    };

    const httpResponse = await sut.login(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBeInstanceOf(InvalidParamError);
    expect(httpResponse.body.message).toBe("invalid-email");
  });

  test("Should return 401 for invalid email", async () => {
    httpRequest["body"] = {
      email: "invalid_email@example.com",
      password: "valid_password",
    };

    const httpResponse = await sut.login(httpRequest);

    expect(httpResponse.statusCode).toBe(401);
    expect(httpResponse.body).toBeInstanceOf(InvalidParamError);
    expect(httpResponse.body.message).toBe("invalid-credentials");
  });

  test("Should return 401 for invalid password", async () => {
    httpRequest["body"] = {
      email: "valid_email@example.com",
      password: "invalid_password",
    };

    const httpResponse = await sut.login(httpRequest);

    expect(httpResponse.statusCode).toBe(401);
    expect(httpResponse.body).toBeInstanceOf(InvalidParamError);
    expect(httpResponse.body.message).toBe("invalid-credentials");
  });

  test("Should call AuthService with correct values", async () => {
    httpRequest["body"] = {
      email: "valid_email@example.com",
      password: "valid_password",
    };

    const httpResponse = await sut.login(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({ token: "valid_token" });
  });
});
