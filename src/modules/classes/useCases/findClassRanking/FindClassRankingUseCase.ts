import { inject, injectable } from "tsyringe";

import {
  IStudentRanking,
  IStudentsRepository,
} from "@modules/classes/repositories/IStudentsRepository";

interface IRequest {
  class_id: string;
}

@injectable()
class FindClassRankingUseCase {
  constructor(
    @inject("StudentsRepository")
    private studentsRepository: IStudentsRepository
  ) {}

  public async execute({ class_id }: IRequest): Promise<IStudentRanking[]> {
    const studentsRanking = await this.studentsRepository.findClassRanking(
      class_id
    );

    return studentsRanking;
  }
}

export { FindClassRankingUseCase };
