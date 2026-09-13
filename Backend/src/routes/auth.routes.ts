import { Router } from "express";
import {loginController ,registerController} from "../controllers/auth.controller"
import {validateRegister,validateLogin} from "../validator/auth.validator" 
import {validate} from "../middleware/validate.middleware"
const router = Router();

router.post("/register",validate(validateRegister),registerController)
router.post("/login",validate(validateLogin),loginController)

export default router;
