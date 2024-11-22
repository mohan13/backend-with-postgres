import express, { Application, Request, Response } from "express";
const app: Application = express();
import * as dotenv from "dotenv";

dotenv.config();
const PORT: number = 4000;

require("./db/connect");

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("Server has started at port", PORT);
});
