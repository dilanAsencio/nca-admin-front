
export interface columns {
  nameField: string;
  key: string;
}
export interface btnActions {
  tooltip: string;
  icon: {path: string; alt: string};
  action: () => void;
}
export interface DropTableProps {
  title: string;
  columns: columns[];
  data: Array<{
    [key: string]: any;
    children?: any[];
    childrenColumns?: columns[];
  }>;
  btnActions?: (row: any) => btnActions[];
}