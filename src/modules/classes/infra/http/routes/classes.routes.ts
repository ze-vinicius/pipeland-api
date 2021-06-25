import { Router } from "express";

import { AddStudentsToClassController } from "@modules/classes/useCases/addStudentsToClass/AddStudentsToClassController";
import { CreateClassController } from "@modules/classes/useCases/createClass/CreateClassController";
import { CreateTaskController } from "@modules/classes/useCases/createTaskUseCase/CreateTaskController";
import { FindClassInfoController } from "@modules/classes/useCases/findClassInfo/FindClassInfoController";
import { FindClassRankingController } from "@modules/classes/useCases/findClassRanking/FindClassRankingController";
import { FindDayAttendanceListController } from "@modules/classes/useCases/findDayAttendanceList/FindDayAttendanceListController";
import { JoinClassController } from "@modules/classes/useCases/joinClass/JoinClassController";
import { ListClassTasksController } from "@modules/classes/useCases/listClassTasks/ListClassTasksController";
import { ListGameElementsController } from "@modules/classes/useCases/listGameElements/ListGameElementsController";
import { ListUserClassesController } from "@modules/classes/useCases/listUserClasses/ListUserClassesController";
import { UpdateDayAttendanceListController } from "@modules/classes/useCases/updateDayAttendanceList/UpdateDayAttendanceListController";
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
const listGameElementsController = new ListGameElementsController();
const joinClassController = new JoinClassController();
const findClassRankingController = new FindClassRankingController();
const updateDayAttendanceList = new UpdateDayAttendanceListController();
const findDayAttendanceListController = new FindDayAttendanceListController();

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

classesRouter.post(
  "/join",
  ensureAuthenticated,
  ensureAuthorizated("STUDENT"),
  joinClassController.handle
);

classesRouter.get("/game-elements", listGameElementsController.handle);

classesRouter.get(
  "/:id",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER", "STUDENT"),
  findClassInfoController.handle
);

classesRouter.put(
  "/:id/attendance-list",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER"),
  updateDayAttendanceList.handle
);

classesRouter.get(
  "/:id/attendance-list",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER"),
  findDayAttendanceListController.handle
);

classesRouter.get(
  "/:id/ranking",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER", "STUDENT"),
  findClassRankingController.handle
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

export { classesRouter };
