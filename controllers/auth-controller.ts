import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import {
  signInUser,
  signUpUser,
} from "@/service/server/authentication/auth-service";

export const signUpController = async (req: Request) => {
  await connectDB();

  try {
    const { name, email, password } = await req.json();

    const user = await signUpUser(name, email, password);

    return NextResponse.json({ user });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 400 });
  }
};

export const signInController = async (req: Request) => {
  await connectDB();
  try {
    const { email, password } = await req.json();

    const { user, token } = await signInUser(email, password);

    const response = NextResponse.json({ user });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 400 });
  }
};
