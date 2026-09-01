import express from "express";
import connectToDB from "./config/database";

const app = express();

// Middleware
app.use(express.json());

//connect to database
connectToDB();

export default app;
