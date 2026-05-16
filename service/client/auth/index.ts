import { API_URLS } from "@/api-urls";
import { handleRequest, headers, Methods } from "../utility";

export const signupClient = async (name: string, email: string, password: string) => {
  const options = {
    method: Methods.POST,
    headers,
    body: JSON.stringify({ name, email, password }),
  };

  return handleRequest(API_URLS.AUTH.SIGNUP, options);
};

export const signinClient = async (email: string, password: string) => {
  const options = {
    method: Methods.POST,
    headers,
    body: JSON.stringify({ email, password }),
  };

  return handleRequest(API_URLS.AUTH.SIGNIN, options);
};