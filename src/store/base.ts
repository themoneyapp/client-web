import { default as createStore, StateCreator, UseStore, State } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { Optional } from "src/types/generic";

export type StorageValue<S> = {
  state: S;
  version: number;
};

export type PersistOptions<S> = {
  deserialize?: (str: string) => StorageValue<S> | Promise<StorageValue<S>>;
  migrate?: (persistedState: Partial<S>, version: number) => S | Promise<S>;
  name: string;
  onRehydrateStorage?: (state: S) => ((state?: S, error?: Error) => void) | void;
  serialize?: (state: StorageValue<S>) => string | Promise<string>;
  version?: number;
  whitelist?: (keyof S)[];
};

export function configureStore<TState extends State>(
  name: string,
  createState: StateCreator<TState>,
  enablePersist = false,
  persistOptions: Optional<PersistOptions<TState>> = null
): UseStore<TState> {
  let stateCreator = createState;
  if (process.env.NODE_ENV === "development") {
    stateCreator = devtools(stateCreator, name);
  }

  if (enablePersist) {
    if (!persistOptions) {
      throw new Error("Please provide persistOptions");
    }
    stateCreator = persist(stateCreator, {
      ...persistOptions,
      getStorage: () => sessionStorage,
    });
  }
  return createStore<TState>(stateCreator);
}

export default configureStore;
