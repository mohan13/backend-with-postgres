import { Request, Response } from "express";
import Rooms from "../db/models/roomModel";
import { AuthRequest } from "../middleware/authMiddleware";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import User from "../db/models/userModel";

const createRooms = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const {
      title,
      roomDescription,
      roomType,
      price_per_night,
      currency,
      amenities,
      location,
    } = req.body;

    // Parse JSON strings (location and amenities)
    const parsedLocation = JSON.parse(location); // Convert location from string to object
    const parsedAmenities = JSON.parse(amenities); // Convert amenities from string to array

    let images = req.files as Express.Multer.File[];

    const roomsImages = images.map((file) => file.filename);

    if (
      [title, roomDescription, roomType, currency].some(
        (field) => field?.trim() == ""
      ) ||
      Object.keys(parsedAmenities).length == 0 ||
      Object.keys(parsedLocation).length == 0
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const rooms = await Rooms.create({
      title,
      roomDescription,
      roomType,
      amenities: parsedAmenities,
      price_per_night,
      currency,
      location: parsedLocation,
      roomImages: roomsImages,
      userId: userId,
    });

    res
      .status(200)
      .json(new ApiResponse(200, rooms, "Room added successfully"));
  }
);

const getAllRooms = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const rooms = await Rooms.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });

    res
      .status(200)
      .json(new ApiResponse(200, rooms, "Rooms fetched successfully!"));
  }
);

const getRoomDetails = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const room = await Rooms.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "username", "role", "email", "userImage"],
        },
      ],
    });

    if (!room) {
      throw new ApiError(404, "No room with that id");
    } else {
      res
        .status(200)
        .json(new ApiResponse(200, room, "Room fetched successfully"));
    }
  }
);

const deleteRoom = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const room_is_available = await Rooms.findAll({
      where: { id: id },
    });

    if (room_is_available.length > 0) {
      await Rooms.destroy({
        where: {
          id: id,
        },
      });
      res
        .status(200)
        .json(new ApiResponse(200, {}, "Room deleted successfully!"));
    } else {
      throw new ApiError(404, "No room with that found!");
    }
  }
);

const updateRoom = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const {
      title,
      roomDescription,
      roomType,
      price_per_night,
      currency,
      amenities,
      availability,
      location,
    } = req.body;

    let images = req.files as Express.Multer.File[];

    const roomsImages = images.map((file) => file.filename);

    const updatedRoom = await Rooms.update(
      {
        title,
        roomDescription,
        roomType,
        price_per_night,
        currency,
        amenities,
        availability,
        location,
        roomImages: roomsImages,
      },
      {
        where: {
          id,
        },
      }
    );
    res
      .status(200)
      .json(new ApiResponse(200, updatedRoom, "Room updated successfully!"));
  }
);
export { createRooms, getAllRooms, getRoomDetails, deleteRoom, updateRoom };
