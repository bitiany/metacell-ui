import MetaTable from '@/core/table/MetaTable';
import { TableDemo } from '@/config/config'

const Table = (props: any) => {
  return (
    <div>
      <MetaTable title={TableDemo.label} columns={TableDemo.columns} apiKey={TableDemo.apiKey} label={TableDemo.label}></MetaTable>
    </div>
  )
}

export default Table;