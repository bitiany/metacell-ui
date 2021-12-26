import { MetaFilter, ItemType } from "@/core/types";
import * as Filters from './filter'

export const filterDropdown = ({...filter}: MetaFilter) => {
  const Filter = Filters.default[ItemType[filter.itemType] + 'Filter']
  const options = filter.pickOptions?.map(option => {
    return {
      label: option.name,
      value: option.code
    }
  })
  return Filter ? <Filter {...filter} options={options} /> : null
};


