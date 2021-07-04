import { GetState, SetState } from "zustand";

import apiClient from "src/modules/apiClient";
import { UserStore } from "src/types/store";
import { UserSignUpRequest, UserSignInRequest } from "src/types/user";

function _sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function handleGetCurrentUser(
  getState: GetState<UserStore>,
  setState: SetState<UserStore>
): Promise<void> {
  await _sleep(4000);

  const state = getState();

  if (!state.accessToken) {
    setState({
      userChecked: true,
      accessToken: null,
      user: null,
    });

    return;
  }

  setState({
    user: {
      id: "user-id",
      full_name: "user",
      is_admin: false,
      email: "user",
      is_active: true,
      is_superuser: false,
    },
    userChecked: true,
  });
}

export async function handleSignIn(
  payload: UserSignInRequest,
  setState: SetState<UserStore>
): Promise<void> {
  console.log("abcd", payload);
  const formData = new FormData();
  let key: keyof UserSignInRequest;
  for (key in payload) {
    let payloadKey: string = key;
    if (key == "email") {
      payloadKey = "username";
    }
    formData.append(payloadKey, payload[key]);
  }

  apiClient({
    url: "/auth/access-token",
    data: formData,
    method: "POST",
    headers: {
      "Content-Type": "x-www-form-urlencoded",
    },
  });
  // console.log(response);
  setState({
    accessToken: "str",
  });
}

export async function handleSignUp(
  payload: UserSignUpRequest,
  setState: SetState<UserStore>
): Promise<void> {
  console.log(payload, setState);
  apiClient.post("/users/open", payload);
}

export async function handleLogout(setState: SetState<UserStore>): Promise<void> {
  setState({
    user: null,
    userChecked: true,
    accessToken: null,
  });
}
