import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { ClassesRepositoryInMemory } from "@modules/classes/repositories/in-memory/ClassesRepositoryInMemory";

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
    createClassUseCase = new CreateClassUseCase(classesRepositoryInMemory);
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
});
