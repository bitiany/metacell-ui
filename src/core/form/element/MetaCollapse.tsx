import { Divider} from 'antd'

const MetaCollapse = (props: any) => {
  return (<div>
    <Divider orientation="left">{props.label}</Divider>
  </div>)
}

export default MetaCollapse;