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
    restrictTo(Role.Admin),
    upload.array("roomImages", 12),
    createRooms
  )
  .get(getAllRooms);

router
  .route("/:id")
  .get(getRoomDetails)
  .delete(verifyJWT, restrictTo(Role.Admin), deleteRoom)
  .patch(
    verifyJWT,
    restrictTo(Role.Admin),
    upload.array("roomImages", 12),
    updateRoom
  );

export default router;
