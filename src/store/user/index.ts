import createStore from "zustand";

import { UserState, UserStore } from "src/types/store";
import { UserSignUpRequest, UserSignInRequest } from "src/types/user";

import * as actions from "./actions";

const defaultState: UserState = {
  user: null,
  userChecked: false,
};

export const useStore = createStore<UserStore>((set) => ({
  ...defaultState,
  handleSignIn: async (payload: UserSignInRequest): Promise<void> => {
    return actions.handleSignIn(payload, set);
  },
  handleSignUp: async (payload: UserSignUpRequest): Promise<void> => {
    return actions.handleSignUp(payload, set);
  },
  checkUser: async (): Promise<void> => {
    await actions.handleLogout(set);
  },
  handleLogout: async (): Promise<void> => {
    await actions.handleLogout(set);
  },
  reset: (): void => {
    set((): UserState => defaultState);
  },
}));

export * as selectors from "./selectors";

export default useStore;
