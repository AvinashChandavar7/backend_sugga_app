import { Router } from "express";

import verifyToken from "../middleware/auth.middleware";

import {
  registerUser,
  loginUser,
  tokenValidation,
  logoutUser,
  getCurrentUser
} from "../controllers/user.controller";


const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get("/validate-token", verifyToken, tokenValidation);

router.get("/current-user", verifyToken, getCurrentUser);


router.post('/logout', logoutUser);

export default router;
