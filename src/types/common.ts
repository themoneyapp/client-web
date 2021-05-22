import { ComponentType as ReactComponentType } from "react";
import { RouteComponentProps } from "react-router-dom";

export interface BigObject<T> {
  [index: string]: T;
}

export type ComponentType = ReactComponentType<RouteComponentProps>;

export enum StatusEnum {
  ERROR = "error",
  IDLE = "idle",
  READY = "ready",
  RUNNING = "running",
  SUCCESS = "success",
}

export interface RouteConfig {
  component: ComponentType;
  isPrivate: boolean;
  path: string;
}

export interface BaseMenuItem {
  title: string;
  route?: RouteConfig;
}

export interface MenuItem extends BaseMenuItem {
  submenu: BaseMenuItem[];
}
