import config from "../config/config";
import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { validateLogin, validateRegister } from "../validator/auth.validator";
import passport from "../config/passport";

function sendTokenResponse(
  user: InstanceType<typeof User>,
  res: Response,
  status: number,
  message: string,
) {
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET_KEY, {
    expiresIn: "3d",
  });

  const userObj = user.toObject();
  delete userObj.password;

  res.cookie("token", token);
  res.status(status).json({
    message: message,
    success: true,
    user: userObj,
  });
}

const registerController = async function (req: Request, res: Response) {
  // const { fullName, email, password, contact, isSeller } = req.body;
  try {
    const { fullName, email, password, contact, role } = validateRegister.parse(
      req.body,
    );
    const existingUser = await User.findOne({
      $or: [{ email }, { contact }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      fullName,
      email,
      password,
      contact,
      role,
    });
    await newUser.save();

    sendTokenResponse(newUser, res, 201, "User registered successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const loginController = async function (req: Request, res: Response) {
  try {
    const { email, contact, password } = validateLogin.parse(req.body);

    const condition = email ? { email } : { contact };
    const isUserExist = await User.findOne(condition).select("+password");
    if (!isUserExist) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isPasswordCorrect = await isUserExist.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    sendTokenResponse(isUserExist, res, 200, "User login successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getMe = async function (req: Request, res: Response) {
  const user = req.user;
  if (!user) {
    return res.status(400).json({
      message: "Not authenticated",
    });
  }
  res.status(200).json({
    message: "User fetched successfully",
    user: {
      id: user._id,
      email: user.email,
      contact: user.contact,
      fullName: user.fullName,
      role: user.role,
    },
  });
};

const googleAuthController = passport.authenticate("google", {
  scope: ["profile", "email"],
});
const googleCallbackController = (req: Request, res: Response) => {
  passport.authenticate(
    "google",
    { session: false },
    (error: any, user: InstanceType<typeof User> | false) => {
      if (error || !user) {
        console.error("Google authentication error", error);
        return res.redirect(
          `${config.FRONTEND_URL}/login?error=google_auth_failed`,
        );
      }
      const token = jwt.sign({ id: user._id }, config.JWT_SECRET_KEY, {
        expiresIn: "3d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: config.NODE_ENV === "production",
        sameSite: config.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      return res.redirect(`${config.FRONTEND_URL}/`);
    },
  )(req, res);
};

export {
  loginController,
  registerController,
  getMe,
  googleAuthController,
  googleCallbackController,
};
