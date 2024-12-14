import express, { Router } from "express";
import { registerUser } from "../controller/user.controller";
import { upload } from "../middleware/multer";

const router: Router = express.Router();

router.route("/register").post(upload.single("userImage"), registerUser);

export default router;
