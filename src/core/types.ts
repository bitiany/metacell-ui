export interface PickOption{
  name: string;
  code: string;
  defaultOption: boolean;
}

export interface MetaItem {
  label?: string;
  apiKey?: string;
  itemType: number;
  filterabled?: boolean;
  sortabled?: boolean;
  primaryProperty?: boolean;
  extInfo?: any;
  pickOptions?: PickOption[],
  selected?: boolean;
  helpText?: string;
}

export type MetaTableProps = {
  label:string;
  apiKey?: string;
  title?:string;
  columns?: any[];
  data?: any[];
  preference?:boolean;
  pagination?: any;
  onChange?: (pagination:any, filters:any, sorter:any, extra:any)=>void;
}

export interface MetaFilter extends MetaItem {
  options?: any;
  confirm: () => void;
  clearFilters:  () => void;
  setSelectedKeys: (v: string[]) => void;
}

export const ItemType = {
  1: "Input",
  2: "Number",
  3: "Date",
  4: "Select",
  5: "Switch"
}