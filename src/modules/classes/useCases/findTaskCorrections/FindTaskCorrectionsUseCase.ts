import { inject, injectable } from "tsyringe";

import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { IStudentsRepository } from "@modules/classes/repositories/IStudentsRepository";
import { ITasksCorrectionsElementsRepository } from "@modules/classes/repositories/ITasksCorrectionsElementsRepository";
import { ITasksCorrectionsRepository } from "@modules/classes/repositories/ITasksCorrectionsRepository";
import { ITasksRepository } from "@modules/classes/repositories/ITasksRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  task_id: string;
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

type IResponse = Array<{
  id: string;
  name: string;
  task_correction: ITaskCorrection | undefined;
}>;

@injectable()
class FindTaskCorrectionsUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,
    @inject("StudentsRepository")
    private studentsRepository: IStudentsRepository,
    @inject("TasksCorrectionsRepository")
    private tasksCorrectionsRepository: ITasksCorrectionsRepository,
    @inject("TasksCorrectionsElementsRepository")
    private tasksCorrectionsElementsRepository: ITasksCorrectionsElementsRepository,
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository
  ) {}

  public async execute({ task_id, user_id }: IRequest): Promise<IResponse> {
    const findTask = await this.tasksRepository.findById(task_id);

    if (!findTask) {
      throw new AppError("Tarefa não encontrada", 404);
    }

    const findClass = await this.classesRepository.findById(findTask.class_id);

    if (!findClass) {
      throw new AppError("Turma não encontrada", 404);
    }

    if (findClass.teacher_id !== user_id) {
      throw new AppError("Você não tem autorização para fazer isso", 403);
    }

    const findStudents = await this.studentsRepository.findAllByClassId(
      findClass.id
    );

    const findTaskCorrections = await this.tasksCorrectionsRepository.findAllByTaskId(
      {
        task_id,
      }
    );

    const formatedStudents = findStudents.map((student) => {
      const findTaskCorrection = findTaskCorrections.find(
        (taskCorrection) => taskCorrection.student_id === student.id
      );

      const applied_penalties: Array<ITaskCorrectionElement> = [];
      const applied_bonuses: Array<ITaskCorrectionElement> = [];

      findTaskCorrection?.task_correction_elements.forEach(
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

      return {
        id: student.id,
        name: student.user.name,
        photo: student.photo,
        task_correction: findTaskCorrection && {
          id: findTaskCorrection.id,
          earned_coins: Number(findTaskCorrection.computed_coins),
          delivered_date: findTaskCorrection.delivered_date,
          comment: findTaskCorrection.comment,
          applied_penalties,
          applied_bonuses,
        },
      };
    });

    return formatedStudents;
  }
}

export { FindTaskCorrectionsUseCase };
