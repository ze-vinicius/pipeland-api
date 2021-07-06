import { Router } from "express";

import { GetSessionInfoController } from "@modules/accounts/useCases/getSessionInfo/GetSessionInfoController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateSessionController } from "../../../useCases/createSession/CreateSessionController";

const sessionsRouter = Router();

const createSessionController = new CreateSessionController();
const getSessionsInfoController = new GetSessionInfoController();

sessionsRouter.post("/", createSessionController.handle);
sessionsRouter.get("/", ensureAuthenticated, getSessionsInfoController.handle);

export { sessionsRouter };
