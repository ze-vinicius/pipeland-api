import { Router } from "express";

import { AddStudentsToClassController } from "@modules/classes/useCases/addStudentsToClass/AddStudentsToClassController";
import { CreateClassController } from "@modules/classes/useCases/createClass/CreateClassController";
import { CreateTaskController } from "@modules/classes/useCases/createTaskUseCase/CreateTaskController";
import { FindClassInfoController } from "@modules/classes/useCases/findClassInfo/FindClassInfoController";
import { FindTaskDetailsController } from "@modules/classes/useCases/findTaskDetails/FindTaskDetailsController";
import { ListClassTasksController } from "@modules/classes/useCases/listClassTasks/ListClassTasksController";
import { ListGameElementsController } from "@modules/classes/useCases/listGameElements/ListGameElementsController";
import { ListUserClassesController } from "@modules/classes/useCases/listUserClasses/ListUserClassesController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAuthorizated } from "@shared/infra/http/middlewares/ensureAuthorizated";

const classesRouter = Router();

// CONTROLLERS
const createClassController = new CreateClassController();
const listUserClasses = new ListUserClassesController();
const findClassInfoController = new FindClassInfoController();
const addStudentsToClassController = new AddStudentsToClassController();
const createTaskController = new CreateTaskController();
const listClassTasksController = new ListClassTasksController();
const findTaskDetailsController = new FindTaskDetailsController();
const listGameElementsController = new ListGameElementsController();

// ROUTES
classesRouter.post(
  "/",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER"),
  createClassController.handle
);

classesRouter.get(
  "/",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER", "STUDENT"),
  listUserClasses.handle
);

classesRouter.get("/game-elements", listGameElementsController.handle);

classesRouter.get(
  "/:id",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER", "STUDENT"),
  findClassInfoController.handle
);

classesRouter.post(
  "/:id/students",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER"),
  addStudentsToClassController.handle
);

classesRouter.post(
  "/:id/tasks",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER"),
  createTaskController.handle
);

classesRouter.get(
  "/:id/tasks",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER", "STUDENT"),
  listClassTasksController.handle
);

classesRouter.get(
  "/:class_id/tasks/:task_id",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER", "STUDENT"),
  findTaskDetailsController.handle
);

export { classesRouter };
