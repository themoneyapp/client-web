import { lazy } from "react";

import { MenuItem, RouteConfig } from "src/types/common";

const HomeComponent = lazy(() => import("src/views/Home"));
const SignInComponent = lazy(() => import("src/views/SignIn"));
const SignUpComponent = lazy(() => import("src/views/SignUp"));

type RouteConfigSpec = {
  AdminOverview: RouteConfig;
  AdminUsers: RouteConfig;
  Dashboard: RouteConfig;
  SignIn: RouteConfig;
  SignUp: RouteConfig;
};

export const ROUTES: RouteConfigSpec = {
  AdminOverview: { path: "/admin", isPrivate: true, component: HomeComponent },
  AdminUsers: { path: "/admin/users", isPrivate: true, component: HomeComponent },
  Dashboard: { path: "/", isPrivate: true, component: HomeComponent },
  SignUp: { path: "/sign-up", isPrivate: false, component: SignUpComponent },
  SignIn: { path: "/sign-in", isPrivate: false, component: SignInComponent },
};

const menu: MenuItem[] = [
  {
    title: "Dashboard",
    eventKey: ROUTES.Dashboard.path,
    route: ROUTES.Dashboard,
    submenu: [],
  },
  {
    title: "Administration",
    eventKey: ROUTES.AdminOverview.path,
    submenu: [
      { route: ROUTES.AdminOverview, title: "Overview", eventKey: "admin" },
      { route: ROUTES.AdminUsers, title: "Users", eventKey: "users" },
    ],
  },
  { route: ROUTES.SignIn, title: "Sign In", eventKey: "sign-in", submenu: [] },
  { route: ROUTES.SignUp, title: "Sign Up", eventKey: "sign-up", submenu: [] },
];

export default menu;
