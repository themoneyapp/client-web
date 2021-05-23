import { lazy } from "react";

import { MenuItem, RouteConfig } from "src/types/common";

const HOME = lazy(() => import("src/views/Home"));
const LOGIN = lazy(() => import("src/views/Login"));

type RouteConfigSpec = {
  ADMIN_OVERVIEW: RouteConfig;
  ADMIN_USERS: RouteConfig;
  DASHBOARD: RouteConfig;
  LOGIN: RouteConfig;
};

export const ROUTES: RouteConfigSpec = {
  ADMIN_OVERVIEW: { path: "/admin", isPrivate: true, component: HOME },
  ADMIN_USERS: { path: "/admin/users", isPrivate: true, component: HOME },
  DASHBOARD: { path: "/", isPrivate: true, component: HOME },
  LOGIN: { path: "/login", isPrivate: false, component: LOGIN },
  // REGISTER: { path: "/register", isPrivate: false, component: REGISTER },
};

const menu: MenuItem[] = [
  {
    title: "Dashboard",
    eventKey: ROUTES.DASHBOARD.path,
    route: ROUTES.DASHBOARD,
    submenu: [],
  },
  {
    title: "Administration",
    eventKey: ROUTES.ADMIN_OVERVIEW.path,
    submenu: [
      { route: ROUTES.ADMIN_OVERVIEW, title: "Overview", eventKey: "admin" },
      { route: ROUTES.ADMIN_USERS, title: "Users", eventKey: "users" },
    ],
  },
  { route: ROUTES.LOGIN, title: "Login", eventKey: "login", submenu: [] },
];

export default menu;
