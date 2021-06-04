import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { IStudentsRepository } from "@modules/classes/repositories/IStudentsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
}

type IResponse = Array<{
  id: string;
  name: string;
  active: boolean;
  create_date: Date;
  teacher_name: string;
}>;

@injectable()
class ListUserClassesUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository,
    @inject("StudentsRepository")
    private studentsRepository: IStudentsRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<IResponse> {
    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) {
      throw new AppError("User does not exists");
    }

    if (findUser.role === "STUDENT") {
      const findStudents = await this.studentsRepository.findAllByUserId(
        findUser.id
      );

      const formatClasses = findStudents.map((student) => ({
        id: student.class.id,
        name: student.class.name,
        active: student.class.active,
        teacher_name: student.class.teacher.name,
        create_date: student.class.created_at,
      }));

      return formatClasses;
    }

    const findClasses = await this.classesRepository.findAllByTeacherId(
      user_id
    );

    const formatClasses = findClasses.map((c) => ({
      id: c.id,
      name: c.name,
      active: c.active,
      create_date: c.created_at,
      teacher_name: c.teacher.name,
    }));

    return formatClasses;
  }
}

export { ListUserClassesUseCase };
