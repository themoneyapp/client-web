export interface BaseStore {
  reset(): void;
}

export interface User {
  name: string;
  email: string;
  is_admin: boolean;
  token: string;
}

export interface UserState {
  loginChecked: boolean;
  isLoggedIn: boolean;
  user?: User;
}

export interface UserStore extends BaseStore, UserState {
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  checkUser(): Promise<void>;
}
