import { Router } from "express";
import {
  checkSession,
  login,
  logout,
  register,
} from "../controllers/authController";
import validateSession from "../middleware/validateSession";

const router = Router();

router.post("/register", register);
router.post("/login", validateSession, login);
router.post("/logout", validateSession, logout);
router.get("/check-session", checkSession);

export default router;
