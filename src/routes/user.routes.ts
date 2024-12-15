import express, { Router } from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.controller";
import { upload } from "../middleware/multer";
import authMiddleware, { Role } from "../middleware/authMiddleware";

const router: Router = express.Router();

router.route("/register").post(upload.single("userImage"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router
  .route("/userProfile")
  .get(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Customer),
    getUser
  );

export default router;
