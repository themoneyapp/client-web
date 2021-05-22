import { SetState } from "zustand";

import { UserStore } from "src/types/store";

function _sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function login(setState: SetState<UserStore>): Promise<void> {
  await _sleep(4000);
  setState({
    user: { name: "user", is_admin: false, token: "token" },
    loginChecked: true,
    isLoggedIn: true,
  });
}

export async function logout(setState: SetState<UserStore>): Promise<void> {
  await _sleep(4000);
  setState({
    user: undefined,
    loginChecked: true,
    isLoggedIn: false,
  });
}
