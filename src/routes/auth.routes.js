import {Router} from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import authSchema from "../schemas/authSchema.js";

const authRoutes = Router();

authRoutes.post("/signup", validateSchema(),);
authRoutes.post("/signin", validateSchema(authSchema),);

export default authRoutes;

