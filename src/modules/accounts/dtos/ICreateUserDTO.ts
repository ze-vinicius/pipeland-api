export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  nickname?: string;
  photo?: string;
  role: "TEACHER" | "STUDENT";
}
