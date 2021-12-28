import MetaTable from '@/core/table/MetaTable';
import { TableConfig } from '@/config/config'
import { useLocation } from 'react-router-dom'
import { queryParam } from '@/utils/toolkit'
const data = [{
  key: 1,
  objectId: 1001,
  name:"实体",
  apiKey: "entity"
}]

const Table = (props: any) => {
  const { search,state }:any = useLocation()
  const d = state?.apiKey ? state : queryParam(search)

  return (
    <div>
      <MetaTable title={TableConfig[d?.apiKey]?.label} {...TableConfig[d?.apiKey] || {}} data={[...data]}></MetaTable>
    </div>
  )
}
export default Table;