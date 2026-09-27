import express from "express";
import connectToDB from "./config/database";
import authRoute from "./routes/auth.routes"
import password from "passport"
import cors from "cors"
import morgan from "morgan";
import cookieParser from "cookie-parser";
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'))
app.use(
  cors({
    origin: " http://localhost:5173/",
    credentials: true,
  }),
);

// passport
app.use(password.initialize())


//Routes
app.use("/api/auth",authRoute)

//connect to database
connectToDB();

export default app;
