import { useEffect } from "react";
import shallow from "zustand/shallow";

import logo from "src/assets/images/logo.svg";
import { useAppStore } from "src/store";
import { StatusEnum } from "src/types/common";

import "src/styles/app.scss";

function App(): JSX.Element {
  const [appStatus, startApp] = useAppStore((s) => [s.status, s.startApp], shallow);

  useEffect((): void => {
    if (appStatus === StatusEnum.IDLE) {
      startApp();
    }
  });

  const isRunning = appStatus === StatusEnum.RUNNING;

  return (
    <div className="App">
      <header className="App-header">
        {isRunning && (
          <>
            <img src={logo} className="App-logo" alt="logo" />
            <p>Loading App</p>
          </>
        )}

        {!isRunning && <p>App loaded.</p>}
      </header>
    </div>
  );
}

export default App;
