import { signUpController } from "@/controllers/auth-controller";

export async function POST(req: Request) {
  return signUpController(req);
}