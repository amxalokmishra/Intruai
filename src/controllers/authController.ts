import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { generateToken } from "../services/jwtService";
import { Role } from "../models/role";

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password, roles } = req.body;

  const roleDocs = await Role.find({ name: { $in: roles } });
  const roleIds = roleDocs.map((role) => role.name);

  const user = new User({
    username,
    email,
    password,
    roles: roleIds,
  });

  await user.save();
  res.status(201).json({ message: "User created" });
};

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid Credentials" });
      return;
    }

    const token = generateToken(user.username, user.email, user.roles);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
