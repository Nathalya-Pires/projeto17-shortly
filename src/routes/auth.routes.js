import { Router } from "express";
import { signIn } from "../controllers/auth.controllers.js";
import { signUp } from "../controllers/user.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import authSchema from "../schemas/authSchema.js";
import userSchema from "../schemas/userSchema.js";

const authRoutes = Router();

authRoutes.post("/signup", validateSchema(userSchema), signUp);
authRoutes.post("/signin", validateSchema(authSchema), signIn);

export default authRoutes;
