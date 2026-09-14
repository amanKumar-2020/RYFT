import express from "express";
import connectToDB from "./config/database";
import authRoute from "./routes/auth.routes"
import password from "passport"

const app = express();

// Middleware
app.use(express.json());

//Routes
app.use("/api/auth",authRoute)

//connect to database
connectToDB();

export default app;
