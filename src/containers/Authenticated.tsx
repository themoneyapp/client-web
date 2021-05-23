import { useEffect, useState } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import shallow from "zustand/shallow";

import { ROUTE_CONFIG } from "src/constants/menu";
import { useUserStore } from "src/store";
import { ComponentType } from "src/types/common";

function Authenticated(
  WrappedComponent: ComponentType,
  isPrivate: boolean
): (props: RouteComponentProps) => JSX.Element {
  // Actual component
  function Component(props: RouteComponentProps): JSX.Element {
    const [isLoggedIn, loginChecked] = useUserStore((s) => [s.isLoggedIn, s.loginChecked], shallow);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect((): void => {
      if (loginChecked && ((!isLoggedIn && isPrivate) || (isLoggedIn && !isPrivate))) {
        setShouldRedirect(true);
      }
    }, [isLoggedIn, loginChecked]);

    if (!loginChecked) {
      return <h1>Loading...</h1>;
    }

    if (shouldRedirect) {
      return <Redirect to={isPrivate ? ROUTE_CONFIG.LOGIN.path : ROUTE_CONFIG.DASHBOARD.path} />;
    }

    return <WrappedComponent {...props} />;
  }

  return Component;
}

export default Authenticated;
