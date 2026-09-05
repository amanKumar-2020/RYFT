import { Router } from "express";
import {loginController ,registerController} from "../controllers/auth.controller"
import {validateRegister} from "../validator/auth.validator" 
import {validate} from "../middleware/validate.middleware"
const router = Router();

router.post("/register",validate(validateRegister),registerController)

export default router;
