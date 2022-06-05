import { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
// import MetaTree from '@/components/tree'
// import Table from '@/components/table';
import AsyncProvider from '@/core/provider'
import { useEvent, clear } from '@/utils/hooks'
// const { Search } = Input;
const Module = (props: any) => {
  // const {data} = props;
  // const [condition, setCondition] = useState<any>()
  const [provider, setProvider] = useState<any>({ visible: false, data: {} })
  const listener = useEvent("showProvider", { apiKey: "module" })
  useEffect(() => {
    listener((data: any) => {
      console.log(data)
      setProvider({ visible: true, ...data })
    })
    // setCondition({moduleId: "", appId: data.id})
    return () => { clear("showProvider", { apiKey: "module" }) }
    // eslint-disable-next-line
  }, [])
  // const modules:any[] = useMemo(() => {
  //   if(data.modules && Array.isArray(data.modules)){
  //       return data.modules.map((mod:any) => {
  //         return {key: mod.id, title: mod.moduleName, ...mod}
  //       })
  //   }
  //   // eslint-disable-next-line
  // }, [])
  // const onChange = (type?:string, module?:any) => {
  //   console.log(type, module)
  //   if(type === "selected"){
  //     // setCondition({moduleId: module.id, appId: data.id})
  //   }
  // }
  return (<div>
    <Row>
      <Col span={8}>
        {/* <div>
          <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={() => { }} />
        </div>
        <div>
            <MetaTree apiKey={"module"} param={{ appId: data.id }} data={modules} emit={onChange} height={40}/>
        </div> */}
      </Col>
      <Col span={16}>
          <div style={{ paddingLeft: "20px" }}>
             {/* {condition && <Table apiKey={"resource"} condition={condition}></Table>} */}
          </div>
        </Col>
    </Row>
    <AsyncProvider {...provider} setVisible={(visible: boolean) => setProvider({ visible: visible })} />
  </div>)
}

export default Module;