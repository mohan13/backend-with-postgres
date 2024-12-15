import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import cookieParser from "cookie-parser";

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

app.use(express.json({ limit: "16kb" }));

//url bata data ayema teslai samjhes
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));
app.use(cookieParser());

app.listen(PORT, () => {
  console.log("Server has started at port", PORT);
});

//routes import
import userRouter from "./routes/user.routes";
import adminSeeder from "./adminSeeders";

//admin seeder
adminSeeder();

//routes declaration
app.use("/api/v1/users", userRouter);
