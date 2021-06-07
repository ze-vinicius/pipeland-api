import { getRepository, Repository } from "typeorm";

import { IGameElementsRepository } from "@modules/classes/repositories/IGameElementsRepository";

import { GameElement } from "../entities/GameElement";

class GameElementsRepository implements IGameElementsRepository {
  ormRepository: Repository<GameElement>;

  constructor() {
    this.ormRepository = getRepository(GameElement);
  }

  async findAll(): Promise<GameElement[]> {
    const findGameElements = await this.ormRepository.find();

    return findGameElements;
  }
}

export { GameElementsRepository };
