import { Router } from "express";
import { signUp, logIn } from "../controllers/authController";
import { jwtRolesAuth } from "../middlewares/securityMiddleware";

const router = Router();

router.post("/signup", signUp);
router.post("/login", logIn);

router.get("/admin", jwtRolesAuth(["Admin"]), (req, res) => {
  res.send("Welcome Admin");
});

export default router;
