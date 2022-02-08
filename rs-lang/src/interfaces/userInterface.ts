export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserLogInResponse {
  message: string;
  token: string;
  userId: string;
}

export interface IUserRegisterResponse {
  id: string;
  email: string;
}