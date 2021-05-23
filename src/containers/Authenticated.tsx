import { useEffect, useState } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";

import { ROUTES } from "src/constants/menu";
import { userSelectors, useUserStore } from "src/store";
import { ComponentType } from "src/types/common";

function Authenticated(
  WrappedComponent: ComponentType,
  isPrivate: boolean
): (props: RouteComponentProps) => JSX.Element {
  // Actual component
  function Component(props: RouteComponentProps): JSX.Element {
    const isAuthenticated = useUserStore(userSelectors.checkIsAuthenticated);
    const userChecked = useUserStore((s) => s.userChecked);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect((): void => {
      if (userChecked && ((!isAuthenticated && isPrivate) || (isAuthenticated && !isPrivate))) {
        setShouldRedirect(true);
      }
    }, [isAuthenticated, userChecked]);

    if (!userChecked) {
      return <h1>Loading...</h1>;
    }

    if (shouldRedirect) {
      return <Redirect to={isPrivate ? ROUTES.SignIn.path : ROUTES.Dashboard.path} />;
    }

    return <WrappedComponent {...props} />;
  }

  return Component;
}

export default Authenticated;
