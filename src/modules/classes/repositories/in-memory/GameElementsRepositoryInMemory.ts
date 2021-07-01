import { GameElement } from "@modules/classes/infra/typeorm/entities/GameElement";

import { IGameElementsRepository } from "../IGameElementsRepository";

class GameElementsRepositoryInMemory implements IGameElementsRepository {
  private game_elements: GameElement[] = [];

  findAll(): Promise<GameElement[]> {
    throw new Error("Method not implemented.");
  }
}

export { GameElementsRepositoryInMemory };
