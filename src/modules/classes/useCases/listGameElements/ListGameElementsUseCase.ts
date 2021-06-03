import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

// import { AppError } from "@shared/errors/AppError";

interface IGameElement {
  name: string;
  imageUrl: string;
  value: number;
  type: "benefit" | "harm" | string;
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
        type: "benefit",
      },
      {
        name: "coin",
        imageUrl: `${baseURL}/files/game-assets/icons/coin.png`,
        value: 1,
        type: "benefit",
      },
      {
        name: "mushroom-up",
        imageUrl: `${baseURL}/files/game-assets/icons/mushroom-up.png`,
        value: 2,
        type: "benefit",
      },
      {
        name: "star",
        imageUrl: `${baseURL}/files/game-assets/icons/star.png`,
        value: 60,
        type: "benefit",
      },
      {
        name: "cherry",
        imageUrl: `${baseURL}/files/game-assets/icons/cherry.png`,
        value: 0.5,
        type: "benefit",
      },
    ];

    return gameElements;
  }
}

export { ListGameElementsUseCase };
