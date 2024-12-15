import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../db/models/userModel";
import { ApiResponse } from "../utils/ApiResponse";
import { AuthRequest } from "../middleware/authMiddleware";

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

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const [data] = await User.findAll({
    where: {
      email: email,
    },
  });

  if (!data) {
    throw new ApiError(404, "User does not exist");
  }

  const isMatched = bcrypt.compareSync(password, data.password);

  if (isMatched) {
    //generate token and sent to user
  } else {
    throw new ApiError(403, "Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: data.id,
    },
    process.env.SECRET_KEY as string,
    { expiresIn: "20d" }
  );

  const options = { httpOnly: true, secure: true };

  res
    .status(200)
    .cookie("token", token, options)
    .json(
      new ApiResponse(
        200,
        {
          data: { email: data.email, role: data.role, username: data.username },
          token: token,
        },

        "Logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("token", options)
    .json(new ApiResponse(200, {}, "User logged Out!"));
});

const getUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  const users = await User.findOne({
    where: { id: userId },
    attributes: ["username", "email", "userImage"],
  });

  if (users) {
    res
      .status(200)
      .json(new ApiResponse(200, { data: users }, "Users fetch successfully"));
  } else {
    res
      .status(404)
      .json(new ApiResponse(404, {}, "You haven't users anything yet.."));
  }
});

export { registerUser, loginUser, logoutUser, getUser };
