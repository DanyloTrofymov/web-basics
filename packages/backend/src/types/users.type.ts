export interface IUserId {
  id: string;
}

export interface IUserUsername {
  username: string;
}

export interface IUserSignup {
  username: string;
  password: string;
  name: string;
  group: string;
  phone: string;
  idCard: number;
  faculty: string;
  email: string;
  repeatPassword: string;
}

export interface IUserChangePassword {
  id: string;
  oldPassword: string;
  password: string;
  repeatPassword: string;
}
export interface IUserUpdate {
  id: string;
  username: string;
  name: string;
  group: string;
  phone: string;
  idCard: number;
  faculty: string;
  email: string;
}
export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUser {
  id?: string;
  username?: string;
  isActive?: boolean;
  isAdmin?: boolean;
  token?: string;
}

export interface IUserRestorePassword {
  id: string;
  token: string;
  password: string;
  repeatPassword: string;
}

export interface IQuery {
  public: boolean;
  completed: boolean;
  search: string;
  skip: number;
  take: number;
}
