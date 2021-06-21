import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AttendancesRepository } from "@modules/classes/infra/typeorm/repositories/AttendancesRepository";
import { ClassesInviteTokensRepository } from "@modules/classes/infra/typeorm/repositories/ClassesInviteTokensRepository";
import { ClassesRepository } from "@modules/classes/infra/typeorm/repositories/ClassesRepository";
import { GameElementsRepository } from "@modules/classes/infra/typeorm/repositories/GameElementsRepository";
import { StudentsRepository } from "@modules/classes/infra/typeorm/repositories/StudentsRepository";
import { TasksCorrectionsElementsRepository } from "@modules/classes/infra/typeorm/repositories/TasksCorrectionsElementsRepository";
import { TasksCorrectionsRepository } from "@modules/classes/infra/typeorm/repositories/TasksCorrectionsRepository";
import { TasksElementsRepository } from "@modules/classes/infra/typeorm/repositories/TasksElementsRepository";
import { TasksRepository } from "@modules/classes/infra/typeorm/repositories/TasksRepository";
import { IAttendancesRepository } from "@modules/classes/repositories/IAttendancesRepository";
import { IClassesInviteTokensRepository } from "@modules/classes/repositories/IClassesInviteTokensRepository";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { IGameElementsRepository } from "@modules/classes/repositories/IGameElementsRepository";
import { IStudentsRepository } from "@modules/classes/repositories/IStudentsRepository";
import { ITasksCorrectionsElementsRepository } from "@modules/classes/repositories/ITasksCorrectionsElementsRepository";
import { ITasksCorrectionsRepository } from "@modules/classes/repositories/ITasksCorrectionsRepository";
import { ITasksElementsRepository } from "@modules/classes/repositories/ITasksElementsRepository";
import { ITasksRepository } from "@modules/classes/repositories/ITasksRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IClassesRepository>(
  "ClassesRepository",
  ClassesRepository
);

container.registerSingleton<IStudentsRepository>(
  "StudentsRepository",
  StudentsRepository
);

container.registerSingleton<IGameElementsRepository>(
  "GameElementsRepository",
  GameElementsRepository
);

container.registerSingleton<ITasksRepository>(
  "TasksRepository",
  TasksRepository
);

container.registerSingleton<ITasksElementsRepository>(
  "TasksElementsRepository",
  TasksElementsRepository
);

container.registerSingleton<IClassesInviteTokensRepository>(
  "ClassesInviteTokensRepository",
  ClassesInviteTokensRepository
);

container.registerSingleton<ITasksCorrectionsRepository>(
  "TasksCorrectionsRepository",
  TasksCorrectionsRepository
);

container.registerSingleton<ITasksCorrectionsElementsRepository>(
  "TasksCorrectionsElementsRepository",
  TasksCorrectionsElementsRepository
);

container.registerSingleton<IAttendancesRepository>(
  "AttendancesRepository",
  AttendancesRepository
);
