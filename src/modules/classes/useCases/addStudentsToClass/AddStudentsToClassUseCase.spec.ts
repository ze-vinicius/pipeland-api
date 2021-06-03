import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { ClassesRepositoryInMemory } from "@modules/classes/repositories/in-memory/ClassesRepositoryInMemory";
import { StudentsRepositoryInMemory } from "@modules/classes/repositories/in-memory/StudentsRepositoryInMemory";
import { IStudentsRepository } from "@modules/classes/repositories/IStudentsRepository";
import { AppError } from "@shared/errors/AppError";

import { AddStudentsToClassUseCase } from "./AddStudentsToClassUseCase";

let studentsRepositoryInMemory: IStudentsRepository;

let classesRepositoryInMemory: IClassesRepository;

let addStudentsToClassUseCase: AddStudentsToClassUseCase;

describe("AddStudentsToClassUseCase", () => {
  beforeEach(() => {
    classesRepositoryInMemory = new ClassesRepositoryInMemory();

    studentsRepositoryInMemory = new StudentsRepositoryInMemory();

    addStudentsToClassUseCase = new AddStudentsToClassUseCase(
      studentsRepositoryInMemory,
      classesRepositoryInMemory
    );
  });

  it("should be able add students to a existent class", async () => {
    const newClass = await classesRepositoryInMemory.create({
      name: "New Class",
      teacher_id: "1",
    });

    const students = [
      {
        user_id: "2",
      },
      {
        user_id: "3",
      },
    ];

    const newStudents = await addStudentsToClassUseCase.execute({
      class_id: newClass.id,
      teacher_id: "1",
      students,
    });

    expect(newStudents[0].user_id).toBe("2");
  });

  it("should not be able add students to a existent class or a class that you are not the teacher", async () => {
    const students = [
      {
        user_id: "2",
      },
      {
        user_id: "3",
      },
    ];

    await expect(
      addStudentsToClassUseCase.execute({
        class_id: "incorrect_class_id",
        teacher_id: "incorrect_id",
        students,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
