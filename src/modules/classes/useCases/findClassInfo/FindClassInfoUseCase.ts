import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { IStudentsRepository } from "@modules/classes/repositories/IStudentsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  class_id: string;
}

interface IStudentInfo {
  student_id: string;
  user_id: string;
  photo?: string;
  nickname?: string;
  current_coins_qty: number;
  current_avatar: string;
}

type IResponse = {
  id: string;
  name: string;
  active: boolean;
  create_date: Date;
  teacher_name: string;
  coins_max: number;
  student_info?: IStudentInfo | undefined;
};
@injectable()
class FindClassInfoUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository,
    @inject("StudentsRepository")
    private studentsRepository: IStudentsRepository
  ) {}

  public async execute({ user_id, class_id }: IRequest): Promise<IResponse> {
    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) {
      throw new AppError("User does not exists");
    }

    const formatClass: IResponse = {} as IResponse;

    if (findUser.role === "STUDENT") {
      const findStudent = await this.studentsRepository.findByUserIdAndClassId({
        class_id,
        user_id,
      });

      if (!findStudent) {
        throw new AppError("Class was not found");
      }

      Object.assign(formatClass, {
        id: findStudent.class.id,
        name: findStudent.class.name,
        active: findStudent.class.active,
        create_date: findStudent.class.created_at,
        teacher_name: findStudent.class.teacher.name,
        coins_max: 210,
        student_info: {
          student_id: findStudent.id,
          student_name: findStudent.user.name,
          user_id: findStudent.user_id,
          photo: findStudent.photo,
          nickname: findStudent.nickname,
          current_coins_qty: 0,
          current_avatar: "mario",
          current_mushroom_ups_qty: 0,
        },
      });
    } else if (findUser.role === "TEACHER") {
      const findClass = await this.classesRepository.findById(class_id);

      if (!findClass) {
        throw new AppError("Class was not found");
      }

      if (findClass.teacher_id !== user_id) {
        throw new AppError("Class was not found");
      }
      Object.assign(formatClass, {
        id: findClass.id,
        name: findClass.name,
        active: findClass.active,
        create_date: findClass.created_at,
        teacher_name: findClass.teacher.name,
        coins_max: 210,
      });
    }

    return formatClass;
  }
}

export { FindClassInfoUseCase };
