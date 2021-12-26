import MetaTable from '@/core/table/MetaTable';
import { TableDemo } from '@/config/config'
import { useLocation } from 'react-router-dom'

const data = [{
  key: 1,
  objectId: 1001,
  name:"实体",
  apiKey: "entity"
}]

const Table = (props: any) => {
  const { state } = useLocation()
  state && console.log(state)
  return (
    <div>
      <MetaTable title={TableDemo.label} {...TableDemo} data={[...data]}></MetaTable>
    </div>
  )
}
export default Table;