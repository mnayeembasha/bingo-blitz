import express from "express";
import { addTeckziteIds, getMe, signOut, teckziteLoginHandler } from "../controllers/teckziteLoginHandler";
import { isTeckziteUser } from "../middleware/teckziteUserMiddleware";
import { RequestHandler } from "express";

const teckziteRouter = express.Router();

// Ensure handlers are typed correctly
teckziteRouter.post("/addIds", addTeckziteIds);
teckziteRouter.post("/login", teckziteLoginHandler);
teckziteRouter.get("/me", isTeckziteUser as RequestHandler, getMe as RequestHandler);
teckziteRouter.post("/signOut", isTeckziteUser as RequestHandler, signOut as RequestHandler);

export default teckziteRouter;