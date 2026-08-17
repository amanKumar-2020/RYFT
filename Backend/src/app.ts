import express, { Request, Response } from "express";
import connectToDB from "./config/database";

const app = express();
connectToDB();


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
