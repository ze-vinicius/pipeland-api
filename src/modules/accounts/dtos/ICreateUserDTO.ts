export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: "TEACHER" | "STUDENT";
}
