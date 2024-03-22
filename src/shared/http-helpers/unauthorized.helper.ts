import { httpResponse } from "../protocols/http";

export const unauthorized = (error: Error): httpResponse => {
  return {
    statusCode: 401,
    body: error,
  };
};
