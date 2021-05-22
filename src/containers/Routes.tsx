import { Route, Switch } from "react-router-dom";

import menu from "src/constants/menu";
import { BaseMenuItem, MenuItem, RouteConfig } from "src/types/common";

import Authenticated from "./Authenticated";
import Sidebar from "./Sidebar";

function flattenRoutes(): RouteConfig[] {
  const allRoutes: RouteConfig[] = [];
  menu.forEach((item: MenuItem): void => {
    if (item.route) {
      allRoutes.push(item.route);
    }
    item.submenu.forEach((sub: BaseMenuItem): void => {
      if (sub.route) {
        allRoutes.push(sub.route);
      }
    });
  });

  return allRoutes;
}

function Routes(): JSX.Element {
  const allRoutes = flattenRoutes();
  return (
    <Switch>
      <Sidebar />
      {allRoutes.map((route: RouteConfig, index: number): JSX.Element => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={true}
            component={Authenticated(route.component, route.isPrivate)}
          />
        );
      })}
      <Route component={(): JSX.Element => <h1>Not Found!</h1>} />
    </Switch>
  );
}

export default Routes;
