export interface IUser {
  id: string;
  username: string;
  email: string;
  token: string;
  name: string;
  group: string;
  phone: string;
  idCard: string;
  faculty: string;
}

export interface IUserEmail {
  email: string;
}

export interface IUserLogin {
  username: string;
  password: string;
}
export interface IUserSignup {
  username: string;
  password: string;
  name: string;
  group: string;
  phone: string;
  idCard: string;
  faculty: string;
  email: string;
  repeatPassword: string;
}

export interface IUserUpdate {
  id: string;
  username: string;
  name: string;
  group: string;
  phone: string;
  idCard: string;
  faculty: string;
  email: string;
}

export interface IUserChangePassword {
  id: string;
  oldPassword: string;
  password: string;
  repeatPassword: string;
}

export interface IUserRestorePassword {
  token: string;
  password: string;
  repeatPassword: string;
}

export type QueryFields = {
  search?: string;
  skip?: number;
  take?: number;
};

export enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc'
}
