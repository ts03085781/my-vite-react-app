import { ReactNode } from 'react';

export interface TimelineItem {
  children: ReactNode;
  color?: string;
  dot?: ReactNode;
}

export interface CardProps {
  title?: string;
  className?: string;
  children: ReactNode;
  size?: 'default' | 'small';
}

export interface ButtonProps {
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link';
  icon?: ReactNode;
  className?: string;
  href?: string;
  target?: string;
  onClick?: () => void;
  children?: ReactNode;
}
