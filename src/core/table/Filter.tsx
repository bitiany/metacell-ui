import { MetaFilter } from "@/core/types";
import InputFilter from "./filter/InputFitler";
import DropdownFilter from "./filter/SelectFilter";

export const filterDropdown = ({...filter}: MetaFilter) => {
  if (filter.itemType === 1) {
    return <InputFilter {...filter}/>;
  }
  if(filter.itemType === 4){
    const options = filter.pickOptions?.map(option => {
      return {
        label: option.name,
        value: option.code
      }
    })
    return <DropdownFilter {...filter} options={options}/>
  }
  return (
    <div style={{ padding: 8 }}>
    </div>
  );
};


