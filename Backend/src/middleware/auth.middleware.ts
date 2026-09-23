import jwt from "jsonwebtoken";
import config from "../config/config";
import User from "../models/user.model";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  id: string;
}

export const authenticateUser = async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY) as JwtPayload;
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const authenticateSeller = async function (req:Request,res:Response,next:NextFunction){
    
       try{
         if(!req.user){
            return res.status(401).json({ message: "Unauthorized" });
        }
        if(req.user.role!=='seller'){
            return res.status(403).json({message:"Forbidden"})
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(401).json({ message: "Unauthorized" });
    }

}