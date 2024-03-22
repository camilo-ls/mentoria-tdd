import { httpResponse } from "../protocols/http";

export const success = (data: any): httpResponse => {
  return {
    statusCode: 200,
    body: data,
  };
};
