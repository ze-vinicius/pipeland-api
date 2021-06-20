import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { TaskCorrection } from "@modules/classes/infra/typeorm/entities/TaskCorrection";
import { IStudentsRepository } from "@modules/classes/repositories/IStudentsRepository";
import { ITasksCorrectionsRepository } from "@modules/classes/repositories/ITasksCorrectionsRepository";
import { ITasksRepository } from "@modules/classes/repositories/ITasksRepository";
import { AppError } from "@shared/errors/AppError";
import { utils } from "@shared/utils";
// import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}

interface ITaskCorrectionElement {
  id: string;
  name: string;
  imageUrl: string;
  type: "REWARD" | "PENALTY";
}
interface ITaskCorrection {
  id: string;
  comment?: string;
  earned_coins: number;
  delivered_date: Date | undefined;
  applied_penalties: Array<ITaskCorrectionElement>;
  applied_bonuses: Array<ITaskCorrectionElement>;
}

type IResponse = {
  id: string;
  title: string;
  description: string;
  delivery_date: Date;
  create_date: Date;
  task_value: number;
  status: "OPEN" | "CLOSED" | "CORRECTED";
  task_correction?: ITaskCorrection | undefined;
  task_elements: {
    id: string;
    name: string;
    quantity: number;
  }[];
};

@injectable()
class FindTaskDetailsUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,
    @inject("TasksCorrectionsRepository")
    private tasksCorrectionsRepository: ITasksCorrectionsRepository,
    @inject("StudentsRepository")
    private studentsRepository: IStudentsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<IResponse> {
    const findTask = await this.tasksRepository.findById(id);

    if (!findTask) {
      throw new AppError("Tarefa não encontrada");
    }

    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) {
      throw new AppError("Usuário não autenticado", 401);
    }

    let task_value = 0;

    const formatedTaskElements = findTask.task_elements.map((task_element) => {
      task_value +=
        task_element.game_element.type === "REWARD"
          ? task_element.quantity * task_element.game_element.value
          : 0;

      return {
        id: task_element.id,
        name: task_element.game_element.name,
        quantity: task_element.quantity,
        imageUrl: task_element.game_element.imageUrl,
      };
    });

    let findTaskCorrection: TaskCorrection | undefined;

    if (findUser.role === "STUDENT") {
      const findStudent = await this.studentsRepository.findByUserIdAndClassId({
        class_id: findTask.class_id,
        user_id,
      });

      if (!findStudent) {
        throw new AppError("Você não tem autorização para isso!");
      }

      findTaskCorrection = await this.tasksCorrectionsRepository.findByTaskIdAndStudentId(
        {
          task_id: id,
          student_id: findStudent.id,
        }
      );
    }

    const formatTask: IResponse = {
      id: findTask.id,
      title: findTask.title,
      description: findTask.description,
      delivery_date: findTask.delivery_date,
      create_date: findTask.created_at,
      status: utils.getTaskStatus(findTask.delivery_date),
      task_value,
      task_elements: formatedTaskElements,
      task_correction: undefined,
    };

    if (findTaskCorrection) {
      const applied_penalties: Array<ITaskCorrectionElement> = [];
      const applied_bonuses: Array<ITaskCorrectionElement> = [];

      findTaskCorrection.task_correction_elements.forEach(
        (taskCorrectionElement) => {
          const formatCorrectionElement = {
            id: taskCorrectionElement.id,
            name: taskCorrectionElement.game_element.name,
            imageUrl: taskCorrectionElement.game_element.imageUrl,
            type: taskCorrectionElement.game_element.type,
          };

          if (formatCorrectionElement.type === "PENALTY") {
            applied_penalties.push(formatCorrectionElement);
          } else {
            applied_bonuses.push(formatCorrectionElement);
          }
        }
      );

      formatTask.task_correction = {
        id: findTaskCorrection.id,
        earned_coins: findTaskCorrection.earned_coins,
        delivered_date: findTaskCorrection.delivered_date,
        comment: findTaskCorrection.comment,
        applied_penalties,
        applied_bonuses,
      };
    }

    return formatTask;
  }
}

export { FindTaskDetailsUseCase };
