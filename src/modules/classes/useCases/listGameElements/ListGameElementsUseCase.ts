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
        imageUrl: `${baseURL}/files/red-mushroom.png`,
        value: 7,
      },
      {
        name: "coin",
        imageUrl: `${baseURL}/files/coin.png`,
        value: 7,
      },
      {
        name: "mushroom-up",
        imageUrl: `${baseURL}/files/mushroom-up.png`,
        value: 7,
      },
    ];

    return gameElements;
  }
}

export { ListGameElementsUseCase };
