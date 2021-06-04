import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { ClassesRepositoryInMemory } from "@modules/classes/repositories/in-memory/ClassesRepositoryInMemory";
import { StudentsRepositoryInMemory } from "@modules/classes/repositories/in-memory/StudentsRepositoryInMemory";
import { IStudentsRepository } from "@modules/classes/repositories/IStudentsRepository";
import { AppError } from "@shared/errors/AppError";

import { ListUserClassesUseCase } from "./ListUserClassesUseCase";

let studentsRepositoryInMemory: IStudentsRepository;
let classesRepositoryInMemory: IClassesRepository;
let usersRepositoryInMemory: IUsersRepository;

let listUserClasses: ListUserClassesUseCase;

describe("ListUserClassesUseCase", () => {
  beforeEach(() => {
    classesRepositoryInMemory = new ClassesRepositoryInMemory();
    studentsRepositoryInMemory = new StudentsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    listUserClasses = new ListUserClassesUseCase(
      usersRepositoryInMemory,
      classesRepositoryInMemory,
      studentsRepositoryInMemory
    );
  });

  it("should be able to list student classes", async () => {
    const user = await usersRepositoryInMemory.create({
      email: "johndoe@email.com",
      name: "John Doe",
      password: "1234",
      role: "STUDENT",
    });

    const teacher = await usersRepositoryInMemory.create({
      email: "teacher@email.com",
      name: "John Teacher",
      password: "1234",
      role: "TEACHER",
    });

    const firstClass = await classesRepositoryInMemory.create({
      name: "First Class",
      teacher,
    });

    const secondClass = await classesRepositoryInMemory.create({
      name: "First Class",
      teacher,
    });

    await studentsRepositoryInMemory.create({
      class: firstClass,
      user_id: user.id,
    });

    await studentsRepositoryInMemory.create({
      class: secondClass,
      user_id: user.id,
    });

    const classes = await listUserClasses.execute({
      user_id: user.id,
    });

    expect(classes).toHaveLength(2);
  });

  it("should be able to list teacher classes", async () => {
    const teacher = await usersRepositoryInMemory.create({
      email: "teacher@email.com",
      name: "John Teacher",
      password: "1234",
      role: "TEACHER",
    });

    await classesRepositoryInMemory.create({
      name: "First Class",
      teacher_id: teacher.id,
      teacher,
    });

    await classesRepositoryInMemory.create({
      name: "First Class",
      teacher_id: teacher.id,
      teacher,
    });

    const classes = await listUserClasses.execute({
      user_id: teacher.id,
    });

    expect(classes).toHaveLength(2);
  });
});
