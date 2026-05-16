import jwt from "jsonwebtoken";

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
};
