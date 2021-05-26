import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

// import { AppError } from "@shared/errors/AppError";

interface IGameElement {
  name: string;
  imageUrl: string;
  value: number;
}

type IResponse = IGameElement[];

@injectable()
class ListGameElementsUseCase {
  constructor() {
    //
  }

  async execute(): Promise<IResponse> {
    const baseURL = process.env.BASE_URL || "";

    const gameElements = [
      {
        name: "red-mushroom",
        imageUrl: `${baseURL}/files/game-assets/icons/red-mushroom.png`,
        value: 7,
      },
      {
        name: "coin",
        imageUrl: `${baseURL}/files/game-assets/icons/coin.png`,
        value: 7,
      },
      {
        name: "mushroom-up",
        imageUrl: `${baseURL}/files/game-assets/icons/mushroom-up.png`,
        value: 7,
      },
      {
        name: "cherry",
        imageUrl: `${baseURL}/files/game-assets/icons/cherry.png`,
        value: 0.5,
      },
    ];

    return gameElements;
  }
}

export { ListGameElementsUseCase };
