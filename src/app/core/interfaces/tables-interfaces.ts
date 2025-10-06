export interface Columns<T = any> {
  nameField: string;
  key: keyof T & string;
}
export interface ButtonActions {
  tooltip: string;
  icon: {path: string; alt: string};
  action: () => void;
}
export interface DropTableProps<T, C = T> {
  title: string;
  columns: Columns<T>[];
  childrenColumns: Columns<C>[];
  data: Array<T & { children?: C[] }>;
  btnActions?: (row: T) => ButtonActions[];
  btnActionsChild?: (row: C) => ButtonActions[];
}