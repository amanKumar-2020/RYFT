import config from "../config/config"
import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
// import { validateRegister } from "../validator/auth.validator";
// import {z} from "zod"

//  type NewUser = z.infer<typeof validateRegister>;

function sendTokenResponse(
  user: InstanceType<typeof User>,
  res: Response,
  message: string,
) {
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET_KEY, {
    expiresIn: "3d",
  });
  res.cookie("token", token);
  res.status(201).json({
    message: message,
    success: true,
    user,
  });
}

const registerController = async function (req: Request, res: Response) {
  const { fullName, email, password, contact, isSeller } = req.body;
  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { contact }],
    });
    if (existingUser) {
      return res.status(400).json({message: "User already exists"});
    }
    // interface NewUser {
    //   fullName: string;
    //   email: string;
    //   password: string;
    //   contact: string;
    //   isSeller: boolean;
    // }
   
    const newUser = new User({
        fullName,
        email,
        password,
        contact,
        role :isSeller ? "seller" : "buyer"
    })
    await newUser.save();

     sendTokenResponse(newUser, res, "User registered successfully");

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const loginController = async function (req: Request, res: Response) {};

export { loginController, registerController };
