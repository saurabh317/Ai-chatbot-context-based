import { User } from "@/models/user-model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUpUser = async (name: string, email: string, password: string) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return {
      success: false,
      message: "User already exists with this email",
      user: null,
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    success: true,
    message: "User created successfully",
    user,
  };
};


export const signInUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    return {
      success: false,
      message: "User not found",
      user: null,
      token: null,
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return {
      success: false,
      message: "Invalid credentials",
      user: null,
      token: null,
    };
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return {
    success: true,
    message: "Sign in successful",
    user,
    token,
  };
};