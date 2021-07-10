export interface IUserResponseDTO {
  id: string;
  name: string;
  nickname?: string | undefined;
  email: string;
  photo?: string | undefined;
  photo_url: () => string | undefined;
  role: string;
}
