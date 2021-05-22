import createStore from "zustand";

import { UserState, UserStore } from "src/types/store";

import * as actions from "./actions";

const defaultState: UserState = {
  loginChecked: false,
  isLoggedIn: true,
};

export const useStore = createStore<UserStore>((set) => ({
  ...defaultState,
  login: async (): Promise<void> => {
    await actions.login(set);
  },
  checkUser: async (): Promise<void> => {
    await actions.logout(set);
  },
  logout: async (): Promise<void> => {
    await actions.logout(set);
  },
  reset: (): void => {
    set((): UserState => defaultState);
  },
}));

export default useStore;
