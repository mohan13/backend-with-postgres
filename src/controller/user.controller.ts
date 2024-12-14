import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../db/models/userModel";
import { ApiResponse } from "../utils/ApiResponse";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  console.log("email", email);
  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    where: { email: email },
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const userImage = req.file?.filename;

  await User.create({
    username: username.toLowerCase(),
    email,
    userImage: userImage ?? "",
    password: bcrypt.hashSync(password, 12),
  });

  return res
    .status(201)
    .json(new ApiResponse(200, "User registered Successfully"));
});

export { registerUser };
