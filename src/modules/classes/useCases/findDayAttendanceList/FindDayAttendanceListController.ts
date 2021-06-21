import { Response, Request } from "express";
import { container } from "tsyringe";

import { FindDayAttendanceListUseCase } from "./FindDayAttendanceListUseCase";

class FindDayAttendanceListController {
  async handle(request: Request, response: Response): Promise<Response> {
    const logged_user_id = request.user.id;
    const class_id = request.params.id;
    const { date } = request.body;

    const findDayAttendanceList = container.resolve(
      FindDayAttendanceListUseCase
    );

    const dayAttendanceList = await findDayAttendanceList.execute({
      class_id,
      date,
      logged_user_id,
    });

    return response.status(200).json(dayAttendanceList);
  }
}

export { FindDayAttendanceListController };
