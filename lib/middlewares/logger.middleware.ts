import { NextRequest } from 'next/server';

export function loggerMiddleware(req: NextRequest) {
  console.log("Request:", req?.nextUrl?.pathname);
  return null;
}