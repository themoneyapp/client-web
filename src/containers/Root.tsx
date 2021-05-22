import { Suspense, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import shallow from "zustand/shallow";

import { useUserStore } from "src/store";

import Routes from "./Routes";

function Root(): JSX.Element {
  const [loginChecked, checkUser] = useUserStore((s) => [s.loginChecked, s.checkUser], shallow);

  useEffect((): void => {
    if (!loginChecked) {
      checkUser();
    }
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default Root;
