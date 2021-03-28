import { FakeUsersRepository } from "@modules/accounts/repositories/fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "./CreateUserUseCase";

let fakeUsersRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("CreateUserUseCase", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
  });

  it("should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      email: "johndoe@example.com",
      name: "John Doe",
      password: "1234",
      role: "TEACHER",
    });

    expect(user).toHaveProperty("id");
    expect(user.name).toBe("John Doe");
  });

  it("should not be able to create a new user with same email as another user", async () => {
    await createUserUseCase.execute({
      email: "johndoe@example.com",
      name: "John Doe",
      password: "1234",
      role: "TEACHER",
    });

    await expect(
      createUserUseCase.execute({
        email: "johndoe@example.com",
        name: "John Doe",
        password: "1234",
        role: "TEACHER",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
