import { Router } from "express";

import { AddStudentsToClassController } from "@modules/classes/useCases/addStudentsToClass/AddStudentsToClassController";
import { CreateClassController } from "@modules/classes/useCases/createClass/CreateClassController";
import { ListGameElementsController } from "@modules/classes/useCases/listGameElements/ListGameElementsController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAuthorizated } from "@shared/infra/http/middlewares/ensureAuthorizated";

const classesRouter = Router();

// CONTROLLERS
const createClassController = new CreateClassController();
const addStudentsToClassController = new AddStudentsToClassController();
const listGameElementsController = new ListGameElementsController();

// ROUTES
classesRouter.post(
  "/",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER"),
  createClassController.handle
);

classesRouter.post(
  "/:id/students",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER"),
  addStudentsToClassController.handle
);

classesRouter.get("/game-elements", listGameElementsController.handle);

export { classesRouter };
