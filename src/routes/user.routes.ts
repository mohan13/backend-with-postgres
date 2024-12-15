import express, { Router } from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.controller";
import { upload } from "../middleware/multer";
import { restrictTo, Role, verifyJWT } from "../middleware/authMiddleware";

const router: Router = express.Router();

router.route("/register").post(upload.single("userImage"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/profile").get(verifyJWT, restrictTo(Role.Customer), getUser);

export default router;
