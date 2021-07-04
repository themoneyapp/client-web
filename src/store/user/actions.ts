import { GetState, SetState } from "zustand";

import { UserStore } from "src/types/store";
import { UserSignUpRequest, UserSignInRequest } from "src/types/user";

function _sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function handleSignIn(
  payload: UserSignInRequest,
  setState: SetState<UserStore>
): Promise<void> {
  await _sleep(4000);
  console.log(payload, setState);
  // await Promise.reject({ email: "invalid user" });
  setState({
    user: {
      id: "user-id",
      full_name: "user",
      is_admin: false,
      email: payload.email,
      is_active: true,
      is_superuser: false,
      token: "token",
    },
    userChecked: true,
  });
}

export async function handleSignUp(
  payload: UserSignUpRequest,
  setState: SetState<UserStore>
): Promise<void> {
  await _sleep(4000);
  console.log(payload, setState);
  // await Promise.reject({
  //   email: "User already exists",
  //   message: "User Registrations are disabled.",
  // });
}

export async function handleCheckUser(
  setState: SetState<UserStore>,
  getState: GetState<UserStore>
): Promise<void> {
  const state = getState();
  const isUserValid = true;
  setState({
    user: isUserValid ? state.user : null,
    userChecked: true,
  });
}

export async function handleLogout(setState: SetState<UserStore>): Promise<void> {
  setState({
    user: null,
    userChecked: true,
  });
}
