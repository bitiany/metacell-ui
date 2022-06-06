export interface PickOption{
  name: string;
  code: string;
  defaultOption?: boolean;
}

export interface MetaItem {
  label?: string;
  apiKey: string;
  dataType: number;
  extInfo?: any;
  defaultValue?: string;
  helpText?: string;
  pickOptions?: PickOption[],
  determiner?:{
    length: number | number[] //长度,默认为最大长度， 传入数组时，则限定最小和最大
    unique: boolean | string //唯一性，默认false, 可指定scope
    prefix: string; //前缀
    suffix: string; //后缀
  };
}

export interface Columns extends MetaItem{
  sortabled?: boolean; //是否排序列
  filterabled?: boolean; //是否筛选列
  fixed?:boolean; //是否固定列
  hidden?: boolean; //是否默认隐藏列

}

export interface Button {
  name:string;
  code: string;
  type: string;
  child?: Button[]
  hidden?: boolean
  onClick?: string | ((e: any)=> void)
}

export interface Widget{
  button?: {
    main: Button[];
    grid:Button[];
  }
  form?: string | ({

  })
  grid?: string | ({
    columns: Columns[]
    pagination: boolean; //是否显示分页
  })
}

export interface HeaderDef {
  title: string;
  content?: any;
  template: string;
  widget:Widget;

}

export interface PageDef{
  pid: string;
  name:string;
  header?:HeaderDef;
  container: Widget[]
}