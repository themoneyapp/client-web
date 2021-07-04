import { Suspense, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import shallow from "zustand/shallow";

import Preloader from "src/components/Preloader";
import { usePrevious } from "src/modules/hooks";
import { userSelectors, useUserStore } from "src/store";

import { Footer, Navbar, Sidebar } from "./Layout";
import Routes from "./Routes";

function Root(): JSX.Element {
  const [isUserStateRehydrated, userChecked, accessToken, user, handleGetCurrentUser] =
    useUserStore(
      (s) => [s.rehydrated, s.userChecked, s.accessToken, s.user, s.handleGetCurrentUser],
      shallow
    );
  const isAuthenticated = useUserStore(userSelectors.selectIsAuthenticated);
  const prevUser = usePrevious(user);
  const prevAccessToken = usePrevious(accessToken);
  const prevUserChecked = usePrevious(userChecked);
  const [showLoader, setShowLoader] = useState(!userChecked);

  useEffect((): void => {
    if (isUserStateRehydrated && !userChecked) {
      handleGetCurrentUser();
    }
  }, [isUserStateRehydrated, userChecked]);

  // fetch user details on success login
  useEffect((): void => {
    if (!!accessToken && !prevAccessToken) {
      handleGetCurrentUser();
    }
  }, [accessToken]);

  // Add this extra effect to show the preloader complete animation.
  useEffect((): (() => void) | undefined => {
    if (userChecked) {
      const func = setTimeout((): void => {
        setShowLoader(false);
      }, 1000);
      return (): void => clearInterval(func);
    }
  }, [userChecked]);

  // Use effect to show preloader when user is authenticated.
  useEffect((): (() => void) | undefined => {
    if (user !== prevUser && !!user && userChecked === prevUserChecked) {
      setShowLoader(true);
      const func = setTimeout((): void => {
        setShowLoader(false);
      }, 2000);
      return (): void => clearInterval(func);
    }
  }, [user]);

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<Preloader show={true} />}>
          <Preloader show={showLoader} />
          {isAuthenticated && <Sidebar />}

          <main className={isAuthenticated ? "content" : ""}>
            {isAuthenticated && <Navbar />}
            <Routes />
            <Footer />
          </main>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default Root;
