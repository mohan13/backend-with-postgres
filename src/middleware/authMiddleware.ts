import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../db/models/userModel";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

export interface AuthRequest extends Request {
  user?: {
    username: string;
    email: string;
    role: string;
    password: string;
    id: string;
  };
}

export enum Role {
  Admin = "admin",
  Customer = "customer",
}

// class AuthController {
//   async isAuthenticated(
//     req: AuthRequest,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> {
//     //get token from user
//     const token = req.cookies?.accessToken || req.headers.authorization;
//     if (!token || token === undefined) {
//       throw new ApiError(401, "Unauthorized request");
//     }

//     jwt.verify(
//       token,
//       process.env.SECRET_KEY as string,
//       async (err: any, decoded: any) => {
//         if (err) {
//           throw new ApiError(401, "Invalid Token");
//         } else {
//           try {
//             const userData = await User.findByPk(decoded.id);
//             //check if that decoded object id user exist or not
//             if (!userData) {
//               throw new ApiError(404, "No user with that token");
//             }
//             req.user = userData;
//             next();
//           } catch (error: any) {
//             throw new ApiError(500, error?.message || "Something went wrong");
//           }
//           res;
//         }
//       }
//     );
//     // verify token if it is legit or tampered
//   }

//   restrictTo(...roles: Role[]) {
//     return (req: AuthRequest, res: Response, next: NextFunction) => {
//       let userRole = req.user?.role as Role;
//       if (!roles.includes(userRole)) {
//         res.status(403).json({ message: "You don't have permission" });
//       } else {
//         next();
//       }
//     };
//   }
//   //   restrictTo(...roles: Role[]) {}
// }

// export default new AuthController();

export const verifyJWT = asyncHandler(
  async (req: AuthRequest, _: any, next: NextFunction) => {
    try {
      const token =
        req.cookies?.token ||
        req.header("Authorization")?.replace("Bearer ", "");
      if (!token || token === undefined) {
        throw new ApiError(401, "Unauthorized request");
      }
      const decodedToken: any = jwt.verify(
        token,
        process.env.SECRET_KEY as string
      );
      const user = await User.findByPk(decodedToken?.id);

      if (!user) {
        throw new ApiError(401, "Invalid Access Token");
      }
      req.user = user;

      next();
    } catch (error: any) {
      throw new ApiError(401, error?.message || "Invalid access token");
    }
  }
);

export const restrictTo = (...roles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    let userRole = req.user?.role as Role;
    if (!roles.includes(userRole)) {
      res.status(403).json({ message: "You don't have permission" });
    } else {
      next();
    }
  };
};
