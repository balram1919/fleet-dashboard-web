import jwt from "jsonwebtoken";

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
  } catch {
    return null;
  }
}
