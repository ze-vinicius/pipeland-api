// import { differenceInHours, isAfter } from "date-fns";
import { inject, injectable } from "tsyringe";

import { IClassesInviteTokensRepository } from "@modules/classes/repositories/IClassesInviteTokensRepository";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { IStudentsRepository } from "@modules/classes/repositories/IStudentsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  class_invite_token: string;
  user_id: string;
}

interface IResponse {
  id: string;
  name: string;
  teacher_name: string;
  create_date: Date;
  active: boolean;
}

@injectable()
class JoinClassUseCase {
  constructor(
    @inject("StudentsRepository")
    private studentsRepository: IStudentsRepository,
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository,
    @inject("ClassesInviteTokensRepository")
    private classesInviteTokensRepository: IClassesInviteTokensRepository
  ) {}

  public async execute({
    class_invite_token,
    user_id,
  }: IRequest): Promise<IResponse> {
    const findClassInviteToken = await this.classesInviteTokensRepository.findByToken(
      class_invite_token
    );

    if (!findClassInviteToken) {
      throw new AppError("Esse token é inválido ou não existe", 404);
    }

    const findClass = await this.classesRepository.findById(
      findClassInviteToken.class_id
    );

    if (!findClass) {
      throw new AppError("Turma não encontrada", 404);
    }

    if (!findClass.active) {
      throw new AppError("Essa turma não está mais ativa");
    }

    const findStudent = await this.studentsRepository.findByUserIdAndClassId({
      user_id,
      class_id: findClass.id,
    });

    if (findStudent) {
      throw new AppError("Você já está vinculado à essa turma");
    }

    await this.studentsRepository.create({
      user_id,
      class_id: findClass.id,
    });

    return {
      id: findClass.id,
      name: findClass.name,
      teacher_name: findClass.teacher.name,
      create_date: findClass.created_at,
      active: findClass.active,
    };
  }
}

export { JoinClassUseCase };
