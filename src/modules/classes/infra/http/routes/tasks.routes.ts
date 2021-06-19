import { Router } from "express";

import { CorrectTaskController } from "@modules/classes/useCases/correctTask/CorrectTaskController";
import { FindTaskDetailsController } from "@modules/classes/useCases/findTaskDetails/FindTaskDetailsController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAuthorizated } from "@shared/infra/http/middlewares/ensureAuthorizated";

const tasksRouter = Router();

const correctTaskController = new CorrectTaskController();
const findTaskDetailsController = new FindTaskDetailsController();

tasksRouter.get(
  "/:id",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER", "STUDENT"),
  findTaskDetailsController.handle
);

tasksRouter.post(
  "/:id/correct",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER"),
  correctTaskController.handle
);

export { tasksRouter };
