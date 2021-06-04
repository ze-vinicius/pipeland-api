import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { ClassesRepositoryInMemory } from "@modules/classes/repositories/in-memory/ClassesRepositoryInMemory";
import { StudentsRepositoryInMemory } from "@modules/classes/repositories/in-memory/StudentsRepositoryInMemory";
import { IStudentsRepository } from "@modules/classes/repositories/IStudentsRepository";
//
// import { AppError } from "@shared/errors/AppError";

import { FindClassInfoUseCase } from "./FindClassInfoUseCase";

let studentsRepositoryInMemory: IStudentsRepository;
let classesRepositoryInMemory: IClassesRepository;
let usersRepositoryInMemory: IUsersRepository;

let findClassInfo: FindClassInfoUseCase;

describe("FindClassInfoUseCase", () => {
  beforeEach(() => {
    classesRepositoryInMemory = new ClassesRepositoryInMemory();
    studentsRepositoryInMemory = new StudentsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    findClassInfo = new FindClassInfoUseCase(
      usersRepositoryInMemory,
      classesRepositoryInMemory,
      studentsRepositoryInMemory
    );
  });

  it("should be able find class information with student user", async () => {
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
      teacher_id: teacher.id,
      teacher,
    });

    await studentsRepositoryInMemory.create({
      class: firstClass,
      class_id: firstClass.id,
      user_id: user.id,
    });

    const classInfo = await findClassInfo.execute({
      user_id: user.id,
      class_id: firstClass.id,
    });

    expect(classInfo).toMatchObject({
      id: firstClass.id,
      name: "First Class",
    });

    expect(classInfo.studentInfo).toMatchObject({
      user_id: user.id,
    });
  });

  it("should be able to find class information with teacher user", async () => {
    const teacher = await usersRepositoryInMemory.create({
      email: "teacher@email.com",
      name: "John Teacher",
      password: "1234",
      role: "TEACHER",
    });

    const firstClass = await classesRepositoryInMemory.create({
      name: "First Class",
      teacher_id: teacher.id,
      teacher,
    });

    await classesRepositoryInMemory.create({
      name: "First Class",
      teacher_id: teacher.id,
      teacher,
    });

    const classInfo = await findClassInfo.execute({
      user_id: teacher.id,
      class_id: firstClass.id,
    });

    expect(classInfo).toMatchObject({
      id: firstClass.id,
      name: "First Class",
      teacher_name: teacher.name,
    });
  });
});
