import { Router } from "express";
import {loginController ,registerController,getMe} from "../controllers/auth.controller"
import {validateRegister,validateLogin} from "../validator/auth.validator" 
import {validate,} from "../middleware/validate.middleware"
import{authenticateSeller,authenticateUser} from "../middleware/auth.middleware"
const router = Router();

router.post("/register",validate(validateRegister),registerController)
router.post("/login",validate(validateLogin),loginController)
router.get("/me",authenticateUser,getMe)
export default router;
