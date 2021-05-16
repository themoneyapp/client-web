import { StatusEnum } from "src/types/common";
import { AppState, AppStore } from "src/types/store";

import * as actions from "./actions";

import createStore from "zustand";


const defaultState: AppState = {
  status: StatusEnum.IDLE,
};


export const useStore = createStore<AppStore>((set, get) => ({
  ...defaultState,
  startApp: async (): Promise<void> => {
    await actions.startApp(set, get);
  },
  reset: (): void => {
    set((): AppState => defaultState);
  },
}));

export default useStore;