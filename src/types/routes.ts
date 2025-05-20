import { ReactNode } from 'react';

export interface RouteItem {
  path: string;
  element: ReactNode;
  children?: RouteItem[];
}

export type RouteConfig = RouteItem[];
