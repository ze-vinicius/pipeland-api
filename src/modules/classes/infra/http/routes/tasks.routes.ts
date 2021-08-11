import { Router } from "express";

import { CorrectTaskController } from "@modules/classes/useCases/correctTask/CorrectTaskController";
import { DeleteTaskController } from "@modules/classes/useCases/deleteTask/DeleteTaskController";
import { FindTaskCorrectionsController } from "@modules/classes/useCases/findTaskCorrections/FindTaskCorrectionsController";
import { FindTaskDetailsController } from "@modules/classes/useCases/findTaskDetails/FindTaskDetailsController";
import { UpdateTaskController } from "@modules/classes/useCases/updateTask/UpdateTaskController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAuthorizated } from "@shared/infra/http/middlewares/ensureAuthorizated";

const tasksRouter = Router();

const correctTaskController = new CorrectTaskController();
const findTaskDetailsController = new FindTaskDetailsController();
const findTaskCorrectionsController = new FindTaskCorrectionsController();
const updateTaskController = new UpdateTaskController();
const deleteTaskController = new DeleteTaskController();

tasksRouter.get(
  "/:id",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER", "STUDENT"),
  findTaskDetailsController.handle
);

tasksRouter.put(
  "/:id",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER"),
  updateTaskController.handle
);

tasksRouter.delete(
  "/:id",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER"),
  deleteTaskController.handle
);

tasksRouter.post(
  "/:id/corrections",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER"),
  correctTaskController.handle
);

tasksRouter.get(
  "/:id/corrections",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER"),
  findTaskCorrectionsController.handle
);

export { tasksRouter };
