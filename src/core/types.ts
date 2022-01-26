export interface PickOption{
  name: string;
  code: string;
  defaultOption?: boolean;
}

export interface MetaItem {
  label?: string;
  apiKey?: string;
  itemType: number;
  sortabled?: boolean;
  extInfo?: any;
  pickOptions?: PickOption[],
  selected?: boolean;
  helpText?: string;
  component?:string;
}

export interface MetaFormItemProps extends MetaItem {
  editabled?: boolean;
  required?: boolean;
  component?: any;
  defaultValue?: string;
  data?:any;
  setFieldValue?:(...data:any) =>void;
}

export interface MetaFormItem extends MetaItem{
  required?: boolean;
  control?:string;
}

export interface MetaForm {
  title?:string;
  data?: any;
  items?: MetaFormItem[];
}

export interface MetaFormConfig {
  [key:string]: MetaForm;
}

export interface MetaTableItem extends MetaItem{
  filterabled?: boolean;
  primaryProperty?: boolean;
}

export type MetaTableProps = {
  label:string;
  apiKey: string;
  title?:string;
  columns?: MetaTableItem[];
  data?: any[];
  preference?:boolean;
  pagination?: any;
  redirect?:any;
  operation?:any[] 
  onChange?: (pagination:any, filters:any, sorter:any, extra:any)=>void;
  onOperator?:(type:string, data:any) => void
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