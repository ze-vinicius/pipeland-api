import { Router } from "express";

import { CorrectTaskController } from "@modules/classes/useCases/correctTask/CorrectTaskController";
import { FindTaskCorrectionsController } from "@modules/classes/useCases/findTaskCorrections/FindTaskCorrectionsController";
import { FindTaskDetailsController } from "@modules/classes/useCases/findTaskDetails/FindTaskDetailsController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAuthorizated } from "@shared/infra/http/middlewares/ensureAuthorizated";

const tasksRouter = Router();

const correctTaskController = new CorrectTaskController();
const findTaskDetailsController = new FindTaskDetailsController();
const findTaskCorrectionsController = new FindTaskCorrectionsController();

tasksRouter.get(
  "/:id",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER", "STUDENT"),
  findTaskDetailsController.handle
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
