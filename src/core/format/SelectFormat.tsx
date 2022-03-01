import { MetaItem } from "@/core/types";

const SelectFormat = (item: MetaItem, text:any) => {
  const options =item.pickOptions?.filter(option => option.code === text + "");
  if(options && options.length > 0){
    return options[0].name;
  }
  return "-"
}
export default SelectFormat