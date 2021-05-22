import { lazy } from "react";

import { MenuItem, BigObject, RouteConfig } from "src/types/common";

const HOME = lazy(() => import("src/views/Home"));
const LOGIN = lazy(() => import("src/views/Login"));

export const ROUTE_CONFIG: BigObject<RouteConfig> = {
  DASHBOARD: { path: "/", isPrivate: true, component: HOME },
  LOGIN: { path: "/login", isPrivate: false, component: LOGIN },
};

const menu: MenuItem[] = [
  {
    title: "Dashboard",
    submenu: [{ route: ROUTE_CONFIG.DASHBOARD, title: "Overview" }],
  },
  { route: ROUTE_CONFIG.LOGIN, title: "Login", submenu: [] },
];

export default menu;
