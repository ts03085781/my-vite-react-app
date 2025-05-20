import { MenuProps } from 'antd';
import { ReactNode } from 'react';

export interface SidebarMenuItem {
  key: string;
  icon?: ReactNode;
  label: ReactNode;
  children?: SidebarMenuItem[];
}

export type SidebarMenuItems = SidebarMenuItem[];

export type LanguageMenuItem = {
  key: string;
  label: string;
};

export type LanguageMenuItems = MenuProps['items'];
