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

type IResponse = {
  id: string;
  title: string;
  description: string;
  delivery_date: Date;
  create_date: Date;
  task_value: number;
  status: "OPEN" | "CLOSED" | "CORRECTED";
  task_correction?: TaskCorrection | undefined;
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

    let taskCorrection: TaskCorrection | undefined;

    if (findUser.role === "STUDENT") {
      const findStudent = await this.studentsRepository.findByUserIdAndClassId({
        class_id: findTask.class_id,
        user_id,
      });

      if (!findStudent) {
        throw new AppError("Você não tem autorização para isso!");
      }

      taskCorrection = await this.tasksCorrectionsRepository.findByTaskIdAndStudentId(
        {
          task_id: id,
          student_id: findStudent.id,
        }
      );
    }

    const formatTask = {
      id: findTask.id,
      title: findTask.title,
      description: findTask.description,
      delivery_date: findTask.delivery_date,
      create_date: findTask.created_at,
      status: utils.getTaskStatus(findTask.delivery_date),
      task_value,
      task_elements: formatedTaskElements,
      task_correction: taskCorrection,
    };

    return formatTask;
  }
}

export { FindTaskDetailsUseCase };
