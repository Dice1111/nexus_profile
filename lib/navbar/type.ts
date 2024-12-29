import { ReactNode } from "react";

export interface NavBarProps<T> {
  data: NavBarNavigation<T>[]; // Navigation items
  children: ReactNode[];
  wrapperClassName?: string;
}

export interface NavBarNavigation<T> {
  label: string;
  panel: T;
}
