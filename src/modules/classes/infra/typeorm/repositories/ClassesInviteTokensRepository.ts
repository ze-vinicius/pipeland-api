import { getRepository, Repository } from "typeorm";

import { IClassesInviteTokensRepository } from "@modules/classes/repositories/IClassesInviteTokensRepository";

import { ClassInviteToken } from "../entities/ClassInviteToken";

class ClassesInviteTokensRepository implements IClassesInviteTokensRepository {
  private ormRepository: Repository<ClassInviteToken>;

  constructor() {
    this.ormRepository = getRepository(ClassInviteToken);
  }

  public async findByToken(
    token: string
  ): Promise<ClassInviteToken | undefined> {
    const findClassInviteToken = await this.ormRepository.findOne({
      where: { token },
    });

    return findClassInviteToken;
  }

  public async generate(class_id: string): Promise<ClassInviteToken> {
    const newClassInviteToken = this.ormRepository.create({ class_id });

    await this.ormRepository.save(newClassInviteToken);

    return newClassInviteToken;
  }

  public async findByClassId(
    class_id: string
  ): Promise<ClassInviteToken | undefined> {
    const findClassInviteToken = await this.ormRepository.findOne({
      where: { class_id },
    });

    return findClassInviteToken;
  }
}

export { ClassesInviteTokensRepository };
