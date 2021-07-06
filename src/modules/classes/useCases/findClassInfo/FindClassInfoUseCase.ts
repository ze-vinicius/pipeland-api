import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IAttendancesRepository } from "@modules/classes/repositories/IAttendancesRepository";
import { IClassesInviteTokensRepository } from "@modules/classes/repositories/IClassesInviteTokensRepository";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { IStudentsRepository } from "@modules/classes/repositories/IStudentsRepository";
import { ITasksCorrectionsRepository } from "@modules/classes/repositories/ITasksCorrectionsRepository";
import { AppError } from "@shared/errors/AppError";
import { utils } from "@shared/utils";

interface IRequest {
  user_id: string;
  class_id: string;
}

interface IStudentInfo {
  student_id: string;
  user_id: string;
  current_coins_qty: number;
  current_avatar: string;
  attendances_count: number;
}

type IResponse = {
  id: string;
  name: string;
  active: boolean;
  create_date: Date;
  teacher_name: string;
  coins_max: number;
  invite_token?: string;
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
    private studentsRepository: IStudentsRepository,
    @inject("ClassesInviteTokensRepository")
    private classesInviteTokensRepository: IClassesInviteTokensRepository,
    @inject("TasksCorrectionsRepository")
    private tasksCorrectiosnRepository: ITasksCorrectionsRepository,
    @inject("AttendancesRepository")
    private attendancesRepository: IAttendancesRepository
  ) {}

  public async execute({ user_id, class_id }: IRequest): Promise<IResponse> {
    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const formatClass: IResponse = {} as IResponse;

    let invite_token = await this.classesInviteTokensRepository.findByClassId(
      class_id
    );

    if (!invite_token && class_id) {
      invite_token = await this.classesInviteTokensRepository.generate(
        class_id
      );
    }

    if (findUser.role === "STUDENT") {
      const findStudent = await this.studentsRepository.findByUserIdAndClassId({
        class_id,
        user_id,
      });

      if (!findStudent) {
        throw new AppError("Turma não encontrada", 404);
      }

      const findStudentAttendancesCount = await this.attendancesRepository.findStudentAttendancesCountByStudentIdAndClassId(
        {
          class_id,
          student_id: findStudent.id,
        }
      );

      const studentTasksCorrections = await this.tasksCorrectiosnRepository.finAllByStudentId(
        findStudent.id
      );

      const studentCoinsQty = studentTasksCorrections.reduce((acc, curr) => {
        return acc + Number(curr.computed_coins);
      }, 0);

      const current_mushroom_ups_qty = studentTasksCorrections.reduce(
        (acc, curr) => {
          const findMushroom = curr.task_correction_elements.find(
            (element) => element.game_element.name === "mushroom up"
          );

          if (findMushroom) {
            return acc + 1;
          }

          return acc;
        },
        0
      );

      const attendances_count = findStudentAttendancesCount.length
        ? Number(findStudentAttendancesCount[0].attendance_count)
        : 0;

      const current_coins_qty = studentCoinsQty + attendances_count;

      const current_avatar = utils.getStudentCurrentAvatar(current_coins_qty);

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
          current_coins_qty,
          current_avatar,
          attendances_count,
          current_mushroom_ups_qty,
        },
      });
    } else if (findUser.role === "TEACHER") {
      const findClass = await this.classesRepository.findById(class_id);

      if (!findClass) {
        throw new AppError("Turma não encontrada", 404);
      }

      if (findClass.teacher_id !== user_id) {
        throw new AppError("Turma não encontrada", 404);
      }
      Object.assign(formatClass, {
        id: findClass.id,
        name: findClass.name,
        active: findClass.active,
        create_date: findClass.created_at,
        teacher_name: findClass.teacher.name,
        coins_max: 210,
        invite_token: invite_token && invite_token.token,
      });
    }

    return formatClass;
  }
}

export { FindClassInfoUseCase };
