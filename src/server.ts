import express, { Application, Request, Response } from "express";
const app: Application = express();
import helmet from "helmet";
import cors from "cors";

import * as dotenv from "dotenv";

dotenv.config({});

const PORT: number = 4000;
const allowedOrigins = [
  "http://localhost:5173",
  "https://fake-airbnb-psi.vercel.app",
];

app.use(helmet());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

require("./db/connect");

app.use(express.json());

//url bata data ayema teslai samjhes

app.listen(PORT, () => {
  console.log("Server has started at port", PORT);
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

//routes import
import userRouter from "./routes/user.routes";
import roomRouter from "./routes/room.routes";
import bookingRouter from "./routes/booking.routes";
import adminSeeder from "./adminSeeders";

//admin seeder
adminSeeder();

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/booking", bookingRouter);
