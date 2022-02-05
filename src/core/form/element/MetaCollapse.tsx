import { Divider} from 'antd'
// const { Panel } = Collapse;

const MetaCollapse = (props: any) => {

  return (<div>
    <Divider orientation="left" key={props.label}>{props.label}</Divider>
    {/* <Collapse defaultActiveKey={['1']}>
      <Panel header="This is panel header 1" key="1">
        <p>{1}</p>
      </Panel>
    </Collapse> */}
  </div>)
}

export default MetaCollapse;