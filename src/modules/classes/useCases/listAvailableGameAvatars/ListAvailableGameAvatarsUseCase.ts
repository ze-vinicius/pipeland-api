import { inject, injectable } from "tsyringe";

// import { AppError } from "@shared/errors/AppError";

interface IGameAvatar {
  name: string;
  imageUrl: string;
  minCoins: number;
  maxCoins: number;
}

type IResponse = IGameAvatar[];

@injectable()
class ListAvailableGameAvatarsUseCase {
  constructor() {
    //
  }

  async execute(): Promise<IResponse> {
    const baseURL = process.env.BASE_URL || "";

    const gameAvatars = [
      {
        name: "mario",
        imageUrl: `${baseURL}/files/game-assets/icons/mario.png`,
        minCoins: 0,
        maxCoins: 119,
      },
      {
        name: "super-mario",
        imageUrl: `${baseURL}/files/game-assets/icons/super-mario.png`,
        minCoins: 120,
        maxCoins: 149,
      },
      {
        name: "fire-mario",
        imageUrl: `${baseURL}/files/game-assets/icons/fire-mario.png`,
        minCoins: 150,
        maxCoins: 199,
      },
      {
        name: "cape-mario",
        imageUrl: `${baseURL}/files/game-assets/icons/cape-mario.png`,
        minCoins: 200,
        maxCoins: 260,
      },
    ] as IResponse;

    return gameAvatars;
  }
}

export { ListAvailableGameAvatarsUseCase };
