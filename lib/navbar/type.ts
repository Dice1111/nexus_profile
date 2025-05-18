export interface NavBarProps<T> {
  data: NavBarNavigation<T>[]; // Navigation items
  children: React.ReactElement<{ id: string }>[];
  wrapperClassName?: string;
}

export interface NavBarNavigation<T> {
  label: string;
  panel: T;
}
