import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      ...data,
    });

    this.users.push(user);

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((u) => u.id === id);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((u) => u.email === email);

    return user;
  }
}
