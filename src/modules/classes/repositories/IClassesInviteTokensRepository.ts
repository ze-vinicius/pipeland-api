import { ClassInviteToken } from "../infra/typeorm/entities/ClassInviteToken";

interface IClassesInviteTokensRepository {
  generate(class_id: string): Promise<ClassInviteToken>;

  findByToken(token: string): Promise<ClassInviteToken | undefined>;

  findByClassId(class_id: string): Promise<ClassInviteToken | undefined>;
}

export { IClassesInviteTokensRepository };
