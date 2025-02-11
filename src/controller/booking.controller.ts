import { AuthRequest } from "../middleware/authMiddleware";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import {
  BookingData,
  KhaltiResponse,
  PaymentMethod,
  TransactionStatus,
  TransactionVerification,
} from "../validation/types";
import { ApiError } from "../utils/ApiError";
import Payment from "../db/models/pyamentModel";
import Bookings from "../db/models/bookingModel";
import axios from "axios";
import { ApiResponse } from "../utils/ApiResponse";
import BookingDetails from "../db/models/bookingDetails";

const createBooking = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;

    const {
      totalAmount,
      check_in,
      check_out,
      guests,
      paymentDetails,
      hotelId,
    }: BookingData = req.body;

    if (
      !totalAmount ||
      !paymentDetails.paymentMethod ||
      !check_in ||
      !check_out ||
      !hotelId
    ) {
      throw new ApiError(400, "All fields are required");
    }

    console.log("body", req.body);

    const paymentData = await Payment.create({
      paymentMethod: paymentDetails.paymentMethod,
    });

    const bookingData = await Bookings.create({
      totalAmount,
      check_in,
      check_out,
      guests,
      userId,
      paymentId: paymentData.id,
    });

    res
      .status(200)
      .json(new ApiResponse(200, bookingData, "Booking placed successfully!"));

    // if (paymentDetails.paymentMethod === PaymentMethod.Khalti) {
    //   const data = {
    //     return_url: `${process.env.LOCAL_HOST}/success`,
    //     purchase_order_id: bookingData.id,
    //     amount: totalAmount * 100,
    //     website_url: `${process.env.LOCAL_HOST}/`,
    //     purchase_order_name: "orderName_" + bookingData.id,
    //   };

    //   const response = await axios.post(
    //     `${process.env.KHALTI_EPAYMENT}/initiate/`,
    //     data,
    //     {
    //       headers: {
    //         Authorization: `key dceaa4a3358e4f91b89e5c6badf53713`,
    //       },
    //     }
    //   );
    //   const KhaltiResponse: KhaltiResponse = response.data;
    //   paymentData.pidx = KhaltiResponse.pidx;
    //   paymentData.save();

    //   res
    //     .status(200)
    //     .json(
    //       new ApiResponse(
    //         200,
    //         KhaltiResponse.payment_url,
    //         "Booking placed successfully"
    //       )
    //     );
    // } else {
    //   res
    //     .status(200)
    //     .json(
    //       new ApiResponse(200, bookingData, "Booking placed successfully!")
    //     );
    // }
  }
);

const verifyTransaction = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { pidx } = req.body;
    if (!pidx) {
      res.status(400).json({
        message: "Please provide pidx",
      });
      return;
    }
    const response = await axios.post(
      `${process.env.KHALTI_EPAYMENT}/lookup/`,
      {
        pidx,
      },
      {
        headers: {
          Authorization: `${process.env.KHALTI_KEY}`,
        },
      }
    );

    const data: TransactionVerification = response.data;

    if (data.status === TransactionStatus.Completed) {
      //its changed unpaid status into paid status

      await Payment.update(
        { paymentStatus: "paid" },
        {
          where: {
            pidx: pidx,
          },
        }
      );
      res.status(200).json({ message: "Payment verified successfully" });
    } else {
      res.status(200).json({ message: "Payment not verified" });
    }
  }
);

export { createBooking, verifyTransaction };
