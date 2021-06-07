import { GameElement } from "../infra/typeorm/entities/GameElement";

interface IGameElementsRepository {
  findAll(): Promise<GameElement[]>;
}

export { IGameElementsRepository };
