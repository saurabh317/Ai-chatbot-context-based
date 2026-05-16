import { signInController } from "@/controllers/auth-controller";

export async function POST(req: Request) {
  return signInController(req);
}