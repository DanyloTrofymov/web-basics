import { IUser } from './user.type';

export interface IResponceCount {
  data: number;
  status: number;
  message?: string;
}

export interface IResponceUsers {
  data?: IUser[];
  status: number;
  message?: string;
}

export interface IResponceCurrentUser {
  data?: IUser;
  status: number;
  message?: string;
}

export interface IResponceError {
  response: {
    data: {
      status: number;
      message: string;
      fields?: string[] | string;
    };
  };
}
