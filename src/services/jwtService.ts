import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export interface DecodedToken {
  userId: string;
  roles: string[];
}

const JWT_SECRET = "alokisthedev";

export const generateToken = (
  userId: string,
  email: string,
  roles: string[]
) => {
  return jwt.sign({ userId, email, roles }, JWT_SECRET, {
    expiresIn: "5h",
  });
};

export const verifyToken = (token: string): DecodedToken => {
  return jwt.verify(token, JWT_SECRET) as DecodedToken;
};
