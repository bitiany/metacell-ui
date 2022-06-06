export interface MetaControl {
  title?:string;
  component: string;
  apiKey?: string;
  format?: (data:any) =>void
}

export interface Button {
  name:string;
  code: string;
  showType: string;
  child?: Button[]
  hidden?: boolean
}

export interface PickOption{
  name: string;
  code: string;
  defaultOption?: boolean;
}

export interface MetaItem {
  label?: string;
  apiKey: string;
  itemType: number;
  extInfo?: any;
  pickOptions?: PickOption[],
  helpText?: string;
  defaultValue?: string;
}

export interface MetaFormItem extends MetaItem{
  required?: boolean;
  component?:any;
  control?:MetaControl;
  editabled?: boolean;
  hidden?: boolean;
  setFieldValue?:(...data:any) =>void;
  data?:any;
  loadData?:boolean;
  param?:any;
  colspan?:number;
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
  colspan?:number;
}
export interface Widget {
  button:{
    main: Button[]
    table: Button[]
  }
 
}

export interface MetaHeader {
  title?:string;
  content?: any;
  widget?: Widget;
}

export interface MetaPage {
  apiKey: string;
  title?:string;
  header?:MetaHeader;
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
  widget?:any;
  columns?: MetaTableItem[];
  data?: any[];
  preference?:boolean;
  pagination?: any;
  redirect?:any;
  operation?:any[] 
  loading?: boolean
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
  5: "Switch",
  10: "Reference",
  11: "Reference",
}