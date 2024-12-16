import express, { Router } from "express";

import { upload } from "../middleware/multer";
import { createRooms, getAllRooms } from "../controller/room.controller";

const router: Router = express.Router();

router
  .route("/")
  .post(upload.array("roomImages"), createRooms)
  .get(getAllRooms);

export default router;
