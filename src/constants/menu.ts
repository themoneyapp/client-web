import { lazy } from "react";

import { MenuItem, BigObject, RouteConfig } from "src/types/common";

const HOME = lazy(() => import("src/views/Home"));
const LOGIN = lazy(() => import("src/views/Login"));

export const ROUTE_CONFIG: BigObject<RouteConfig> = {
  DASHBOARD: { path: "/", isPrivate: true, component: HOME },
  ADMIN_OVERVIEW: { path: "/admin", isPrivate: true, component: HOME },
  ADMIN_USERS: { path: "/admin/users", isPrivate: true, component: HOME },
  LOGIN: { path: "/login", isPrivate: false, component: LOGIN },
};

const menu: MenuItem[] = [
  {
    title: "Dashboard",
    eventKey: ROUTE_CONFIG.DASHBOARD.path,
    route: ROUTE_CONFIG.DASHBOARD,
    submenu: [],
  },
  {
    title: "Administration",
    eventKey: ROUTE_CONFIG.ADMIN_OVERVIEW.path,
    submenu: [
      { route: ROUTE_CONFIG.ADMIN_OVERVIEW, title: "Overview", eventKey: "admin" },
      { route: ROUTE_CONFIG.ADMIN_USERS, title: "Users", eventKey: "users" },
    ],
  },
  { route: ROUTE_CONFIG.LOGIN, title: "Login", eventKey: "login", submenu: [] },
];

export default menu;
