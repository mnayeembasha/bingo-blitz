import express from "express";
import { addTeckziteIds, getMe, signOut, teckziteLoginHandler } from "../controllers/teckziteLoginHandler";
import { isTeckziteUser } from "../middleware/teckziteUserMiddleware";
import { RequestHandler } from "express";
import { addUserAnswers } from "../controllers/addUserAnswers";
import { addBingoQuestions } from "../controllers/addBingoQuestions";
import { evaluateScore, getTop30Scores } from "../controllers/evaluateScore";

const teckziteRouter = express.Router();

// Ensure handlers are typed correctly
teckziteRouter.post("/addIds", addTeckziteIds);
teckziteRouter.post("/login", teckziteLoginHandler);
teckziteRouter.get("/me", isTeckziteUser as RequestHandler, getMe as RequestHandler);
teckziteRouter.post("/signOut", isTeckziteUser as RequestHandler, signOut as RequestHandler);



const router = express.Router();

teckziteRouter.post("/bingo",isTeckziteUser as RequestHandler,addUserAnswers as RequestHandler );


teckziteRouter.post("/addBingoQuestions",addBingoQuestions as RequestHandler );
teckziteRouter.post("/evaluate",evaluateScore as RequestHandler);
teckziteRouter.post("/getTop30",getTop30Scores as RequestHandler);

export default teckziteRouter;