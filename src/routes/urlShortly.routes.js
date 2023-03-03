import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import urlSchema from "../schemas/urlSchema.js";
import {authValidation} from "../middlewares/auth.middleware.js"
import { deleteUrl, openUrl, shortlyUrl, UrlById } from "../controllers/urlShortly.controllers.js";


const urlRouter = Router();

urlRouter.post("/urls/shorten", validateSchema(urlSchema), authValidation, shortlyUrl);
urlRouter.get("/urls/:id", UrlById);
urlRouter.get("/urls/open/:shortUrl", openUrl);
urlRouter.delete("/urls/:id", authValidation, deleteUrl);

export default urlRouter;
