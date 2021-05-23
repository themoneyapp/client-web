import { UserStore } from "src/types/store";

export const selectIsAuthenticated = (state: UserStore): boolean => {
  return state.userChecked && !!state.user;
};
