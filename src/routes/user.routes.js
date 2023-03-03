import { Router } from "express";
import { getUserById, rankingSum } from "../controllers/user.controllers.js";
import {authValidation} from "../middlewares/auth.middleware.js"


const userRouter = Router();

userRouter.get("/users/me", authValidation, getUserById );
userRouter.get("/ranking", rankingSum);

export default userRouter;
