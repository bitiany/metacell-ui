export interface MetaControl {
  title?:string;
  component: string;
  apiKey?: string;
  format?: (data:any) =>void
}
export interface PickOption{
  name: string;
  code: string;
  defaultOption?: boolean;
}

export interface MetaItem {
  label?: string;
  apiKey?: string;
  itemType: number;
  extInfo?: any;
  pickOptions?: PickOption[],
  helpText?: string;
  defaultValue?: string;
}

// 表单
// export interface MetaFormItemProps extends MetaItem {
//   editabled?: boolean;
//   required?: boolean;
//   control?: any;
//   defaultValue?: string;
//   data?:any;
//   component?:any;
//   setFieldValue?:(...data:any) =>void;
// }


export interface MetaFormItem extends MetaItem{
  required?: boolean;
  component?:any;
  control?:MetaControl;
  editabled?: boolean;
  hidden?: boolean;
  setFieldValue?:(...data:any) =>void;
  data?:any;
}

export interface MetaForm {
  apiKey: string;
  title?:string;
  data?: any;
  items?: MetaFormItem[];
}

export interface MetaFormConfig {
  [key:string]: MetaForm;
}
//详情
export interface MetaGroup{
  title: string;
  collapse?:boolean;
  control?:MetaControl;
  items?: MetaFormItem[];
}

export interface MetaPage {
  apiKey: string;
  items?: MetaFormItem[];
  groups?: MetaGroup[];
}



export interface MetaPageConfig {
  [key:string]: MetaPage;
}

// 表格

export interface MetaTableItem extends MetaItem{
  selected?: boolean;
  sortabled?: boolean;
  filterabled?: boolean;
  primaryProperty?: boolean;
  component?:any;
  control?:MetaControl;
}

export type MetaTableProps = {
  label?:string;
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
  0: "Collapse",
  1: "Input",
  2: "Number",
  3: "Date",
  4: "Select",
  5: "Switch"
}