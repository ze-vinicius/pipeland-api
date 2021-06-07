import { inject, injectable } from "tsyringe";

import { IGameElementsRepository } from "@modules/classes/repositories/IGameElementsRepository";

// import { AppError } from "@shared/errors/AppError";

interface IGameElement {
  name: string;
  description: string;
  imageUrl: string;
  value: number;
  type: "REWARD" | "PENALTY";
}

type IResponse = IGameElement[];

@injectable()
class ListGameElementsUseCase {
  constructor(
    @inject("GameElementsRepository")
    private gameElementsRepository: IGameElementsRepository
  ) {}

  async execute(): Promise<IResponse> {
    const baseURL = process.env.BASE_URL || "";

    const gameElements = await this.gameElementsRepository.findAll();

    const formatGameElements = gameElements.map((game_element) => ({
      id: game_element.id,
      name: game_element.name,
      description: game_element.description,
      value: game_element.value,
      imageUrl: `${baseURL}/files/game-assets/icons/${game_element.image}`,
      type: game_element.type,
    }));

    return formatGameElements;
  }
}

export { ListGameElementsUseCase };
