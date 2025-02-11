import express, { Router } from "express";
import { verifyJWT } from "../middleware/authMiddleware";
import {
  createBooking,
  verifyTransaction,
} from "../controller/booking.controller";

const router: Router = express.Router();
router.route("/").post(verifyJWT, createBooking);
router.route("/verify").post(verifyJWT, verifyTransaction);

export default router;
