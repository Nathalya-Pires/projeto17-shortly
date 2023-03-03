import { Router } from "express";

const userRouter = Router();

userRouter.get("/users/me");
userRouter.get("/ranking");

export default userRouter;
