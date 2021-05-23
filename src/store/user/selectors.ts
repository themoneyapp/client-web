import { UserStore } from "src/types/store";

export const checkIsAuthenticated = (state: UserStore): boolean => {
  return state.userChecked && !!state.user;
};
