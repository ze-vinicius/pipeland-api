import { Router } from "express";

import { ListGameElementsController } from "@modules/classes/useCases/listGameElements/ListGameElementsController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAuthorizated } from "@shared/infra/http/middlewares/ensureAuthorizated";

import { CreateClassController } from "../../../useCases/createClass/CreateClassController";

const classesRouter = Router();

const createClassController = new CreateClassController();
const listGameElementsController = new ListGameElementsController();

classesRouter.post(
  "/",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER"),
  createClassController.handle
);

classesRouter.get("/game-elements", listGameElementsController.handle);

export { classesRouter };
