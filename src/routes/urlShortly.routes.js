import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateSchema());
urlRouter.get("/urls/:id");
urlRouter.get("/urls/open/:shortUrl");
urlRouter.delete("/urls/:id", validateSchema());

export default urlRouter;
