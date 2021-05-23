import { Optional } from "./generic";
import { UserSignUpRequest, UserSignInRequest } from "./user";

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
  userChecked: boolean;
  user: Optional<User>;
}

export interface UserStore extends BaseStore, UserState {
  handleSignIn(payload: UserSignInRequest): Promise<void>;
  handleSignUp(payload: UserSignUpRequest): Promise<void>;
  handleLogout(): Promise<void>;
  checkUser(): Promise<void>;
}
