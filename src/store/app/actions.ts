import { SetState, GetState } from "zustand";

import { StatusEnum } from "src/types/common";
import { AppStore } from "src/types/store";
function _sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function startApp(
  setState: SetState<AppStore>,
  getState: GetState<AppStore>
): Promise<void> {
  const state = getState();
  if (state.status === StatusEnum.RUNNING) {
    return;
  }
  await setState({ status: StatusEnum.RUNNING });
  await _sleep(4000);
  await setState({ status: StatusEnum.SUCCESS });
}
