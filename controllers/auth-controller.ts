import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import {
  signInUser,
  signUpUser,
} from "@/service/server/authentication/auth-service";

export const signUpController = async (req: Request) => {
  await connectDB();

  const { name, email, password } = await req.json();

  const result = await signUpUser(name, email, password);

  if (!result.success) {
    return NextResponse.json(result, { status: 400 });
  }

  return NextResponse.json(result);
};

export const signInController = async (req: Request) => {
  await connectDB();

  const { email, password } = await req.json();

  const result = await signInUser(email, password);

  if (!result.success) {
    return NextResponse.json(result, { status: 400 });
  }

  const response = NextResponse.json(result);

  response.cookies.set("token", result.token!, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return response;
};
