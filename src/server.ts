import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";

import * as dotenv from "dotenv";

dotenv.config({});

const PORT: number = 4000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

require("./db/connect");

app.use(express.json());

//url bata data ayema teslai samjhes
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.listen(PORT, () => {
  console.log("Server has started at port", PORT);
});

app.use(express.static("public"));

//routes import
import userRouter from "./routes/user.routes";
import roomRouter from "./routes/room.routes";
import adminSeeder from "./adminSeeders";

//admin seeder
adminSeeder();

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/rooms", roomRouter);
