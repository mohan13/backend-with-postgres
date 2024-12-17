import express, { Router } from "express";

import { upload } from "../middleware/multer";
import {
  createRooms,
  deleteRoom,
  getAllRooms,
  getRoomDetails,
  updateRoom,
} from "../controller/room.controller";
import { restrictTo, Role, verifyJWT } from "../middleware/authMiddleware";

const router: Router = express.Router();

router
  .route("/")
  .post(
    verifyJWT,
    restrictTo(Role.Customer),
    upload.array("roomImages", 12),
    createRooms
  )
  .get(getAllRooms);

router
  .route("/:id")
  .get(getRoomDetails)
  .delete(verifyJWT, restrictTo(Role.Customer), deleteRoom)
  .patch(verifyJWT, restrictTo(Role.Customer), updateRoom);

export default router;
