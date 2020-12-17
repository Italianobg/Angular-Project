export interface IUsers {
  [index: number]: IUser;
}

export interface IUser {
  id: string;
  data: IUserData;
}

export interface IUserData {
  id: string;
  email: string;
  isLogged: boolean;
  isAdmin: boolean;
}
