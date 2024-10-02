import { Response, Request, NextFunction } from "express";
import { verifyToken } from "../services/jwtService";

export const jwtRolesAuth = (allowedRoles: string[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    try {
      const decoded = verifyToken(token);
      const hasAllowedRole = decoded.roles.some((role: string) =>
        allowedRoles.includes(role)
      );

      if (!hasAllowedRole) {
        res.status(403).json({ message: "Unauthorized: Insufficient role" });
        return;
      }

      (req as any).user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};
