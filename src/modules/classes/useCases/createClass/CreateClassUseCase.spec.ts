import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { ClassesRepositoryInMemory } from "@modules/classes/repositories/in-memory/ClassesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateClassUseCase } from "./CreateClassUseCase";

let usersRepositoryInMemory: IUsersRepository;
let createUserUseCase: CreateUserUseCase;

let classesRepositoryInMemory: IClassesRepository;
let createClassUseCase: CreateClassUseCase;

describe("CreateClassUseCase", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

    classesRepositoryInMemory = new ClassesRepositoryInMemory();
    createClassUseCase = new CreateClassUseCase(
      classesRepositoryInMemory,
      usersRepositoryInMemory
    );
  });

  it("should be able to create a new class", async () => {
    const teacher = await createUserUseCase.execute({
      email: "johndoe@example.com",
      name: "John Doe",
      password: "1234",
      role: "TEACHER",
    });

    const createdClass = await createClassUseCase.execute({
      name: "New Class",
      teacher_id: teacher.id,
    });

    expect(createdClass.name).toBe("New Class");
  });

  it("should not be able to create a new class with user that is not a TEACHER", async () => {
    const notTeacher = await createUserUseCase.execute({
      email: "johndoe@example.com",
      name: "John Doe",
      password: "1234",
      role: "STUDENT",
    });

    await expect(
      createClassUseCase.execute({
        name: "New Class",
        teacher_id: notTeacher.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new class with user that not exists", async () => {
    await expect(
      createClassUseCase.execute({
        name: "New Class",
        teacher_id: "not-existing-user-id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
