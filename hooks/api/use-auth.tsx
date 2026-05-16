import { signinClient, signupClient } from "@/service/client/auth";
import { useMutation } from "@tanstack/react-query";

export function useSignup() {
  return useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => signupClient(name, email, password),
  });
}

export function useSignin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signinClient(email, password),
  });
}
