import { Response, Request } from "express";
import { container } from "tsyringe";

import { RegisterDayAttendanceListUseCase } from "./RegisterDayAttendanceListUseCase";

class RegisterDayAttendanceListController {
  async handle(request: Request, response: Response): Promise<Response> {
    const logged_user_id = request.user.id;
    const class_id = request.params.id;
    const { date, students } = request.body;

    const registerDayAttendance = container.resolve(
      RegisterDayAttendanceListUseCase
    );

    const dayAttendanceList = await registerDayAttendance.execute({
      class_id,
      date,
      logged_user_id,
      students,
    });

    return response.status(200).json(dayAttendanceList);
  }
}

export { RegisterDayAttendanceListController };
