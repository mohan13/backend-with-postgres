import { Response } from "express";
import Rooms from "../db/models/roomModel";
import { AuthRequest } from "../middleware/authMiddleware";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import User from "../db/models/userModel";
import Locations from "../db/models/locationModel";

const createRooms = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const {
    title,
    roomDescription,
    roomType,
    price_per_night,
    currency,
    amenities,
    start_date,
    end_date,
    is_available,
    roomImages,
  } = req.body;

  if (
    [title, roomDescription, roomType, currency, start_date, end_date].some(
      (field) => field?.trim() === ""
    ) &&
    !amenities
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const rooms = await Rooms.create({
    title,
    roomDescription,
    roomType,
    amenities,
    price_per_night,
    currency,
    start_date,
    end_date,
    is_available,
    roomImages,
    userId: userId,
  });

  res.status(200).json(new ApiResponse(200, rooms, "Room added successfully"));
});

const getAllRooms = asyncHandler(async (req: Request, res: Response) => {
  const rooms = await Rooms.findAll({
    include: [
      { model: User, attributes: ["username"] },
      {
        model: Locations,
      },
    ],
  });

  res
    .status(200)
    .json(new ApiResponse(200, rooms, "Rooms fetched successfully!"));
});

export { createRooms, getAllRooms };
