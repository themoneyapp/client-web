import { Optional } from "./generic";
import { UserSignUpRequest, UserSignInRequest } from "./user";

interface BaseStore {
  reset(): void;
}
interface BasePersistedStore extends BaseStore {
  setHyderated(): void;
}

interface BasePersistedState {
  rehydrated: boolean;
}

export interface User {
  name: string;
  email: string;
  is_admin: boolean;
  token: string;
}

export interface UserState extends BasePersistedState {
  userChecked: boolean;
  user: Optional<User>;
}

export interface UserStore extends UserState, BasePersistedStore {
  handleSignIn(payload: UserSignInRequest): Promise<void>;
  handleSignUp(payload: UserSignUpRequest): Promise<void>;
  handleLogout(): Promise<void>;
  handleCheckUser(): Promise<void>;
}
