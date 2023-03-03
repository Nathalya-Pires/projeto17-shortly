import {Router} from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import authSchema from "../schemas/authSchema.js";
import userSchema from "../schemas/userSchema.js"

const authRoutes = Router();

authRoutes.post("/signup", validateSchema(userSchema),);
authRoutes.post("/signin", validateSchema(authSchema),);

export default authRoutes;

