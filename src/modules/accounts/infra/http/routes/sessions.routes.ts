import { Router } from "express";

import { CreateSessionController } from "../../../useCases/createSession/CreateSessionController";

const sessionsRouter = Router();

const createSessionController = new CreateSessionController();

sessionsRouter.post("/", createSessionController.handle);

export { sessionsRouter };
