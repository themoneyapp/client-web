import { Suspense, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import shallow from "zustand/shallow";

import Preloader from "src/components/Preloader";
import { useUserStore } from "src/store";

import { Footer, Navbar, Sidebar } from "./Layout";
import Routes from "./Routes";

function Root(): JSX.Element {
  const [loginChecked, isLoggedIn, checkUser] = useUserStore(
    (s) => [s.loginChecked, s.isLoggedIn, s.checkUser],
    shallow
  );
  const [showLoader, setShowLoader] = useState(!loginChecked);

  useEffect((): void => {
    if (!loginChecked) {
      checkUser();
    }
  });

  // Add this extra effect to show the preloader complete animation.
  useEffect((): void => {
    if (loginChecked) {
      setTimeout((): void => {
        setShowLoader(false);
      }, 1000);
    }
  }, [loginChecked]);

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<Preloader show={true} />}>
          <Preloader show={showLoader} />
          {isLoggedIn && <Sidebar />}

          <main className={isLoggedIn ? "content" : ""}>
            {isLoggedIn && <Navbar />}
            <Routes />
            <Footer />
          </main>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default Root;
