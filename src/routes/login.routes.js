import {Router} from "express";
import { validateSchema } from "../middlewares/validateSchema.js";

const authRoutes = Router();

authRoutes.post("/signup", validateSchema(),);
authRoutes.post("/signin", validateSchema(),);

export default authRoutes;