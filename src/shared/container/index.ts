import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ClassesRepository } from "@modules/classes/infra/typeorm/repositories/ClassesRepository";
import { StudentsRepository } from "@modules/classes/infra/typeorm/repositories/StudentsRepository";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { IStudentsRepository } from "@modules/classes/repositories/IStudentsRepository";

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
