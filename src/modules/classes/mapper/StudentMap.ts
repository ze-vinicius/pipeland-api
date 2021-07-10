import { classToClass } from "class-transformer";

import { IStudentResponseDTO } from "../dtos/IStudentResponseDTO";
import { Student } from "../infra/typeorm/entities/Student";

class StudentMap {
  static toDTO(student: Student): IStudentResponseDTO {
    return classToClass({
      id: student.id,
      name: student.user.name,
      nickname: student.user.nickname,
      photo: student.user.photo,
      photo_url: student.user.photo_url,
      email: student.user.email,
      user_id: student.user_id,
      class_id: student.class_id,
    });
  }
}

export { StudentMap };
