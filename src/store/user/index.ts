import { GetState, SetState } from "zustand";
import { devtools } from "zustand/middleware";

import createStore, { PersistOptions } from "src/store/base";
import { UserState, UserStore } from "src/types/store";
import { UserSignUpRequest, UserSignInRequest } from "src/types/user";

import * as actions from "./actions";

const defaultState: UserState = {
  rehydrated: false,
  user: null,
  accessToken: null,
  userChecked: false,
};

const storeCreator = (set: SetState<UserStore>, get: GetState<UserStore>): UserStore => ({
  ...defaultState,
  handleGetCurrentUser: async (): Promise<void> => {
    return actions.handleGetCurrentUser(get, set);
  },
  handleSignIn: async (payload: UserSignInRequest): Promise<void> => {
    return actions.handleSignIn(payload, set);
  },
  handleSignUp: async (payload: UserSignUpRequest): Promise<void> => {
    return actions.handleSignUp(payload, set);
  },
  handleLogout: async (): Promise<void> => {
    await actions.handleLogout(set);
  },
  reset: (): void => {
    set((): UserState => defaultState);
  },
  setHyderated: (): void => {
    set(() => ({ rehydrated: true }));
  },
});

const persistOptions: PersistOptions<UserStore> = {
  deserialize: (value: string) => {
    return JSON.parse(atob(value));
  },
  name: "USER",
  onRehydrateStorage: () => {
    return (state, error): void => {
      if (!error && state) {
        state.setHyderated();
      }
    };
  },
  serialize: (state): string => {
    return btoa(JSON.stringify(state));
  },
  version: 1,
  whitelist: ["accessToken"],
};

export const useStore = createStore<UserStore>(
  persistOptions.name,
  devtools(storeCreator),
  true,
  persistOptions
);

export * as selectors from "./selectors";

export default useStore;
