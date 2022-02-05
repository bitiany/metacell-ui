import React, { useEffect, useState } from 'react'
import { Collapse, Space, Row, Col } from 'antd';
import { MetaLabel } from '@/core/form/MetaLabel';
import { MetaFormItem, MetaGroup } from '@/core/types';
import getComponent from '@/components';
import api from '@/api';
import { Page } from '@/config/page'
import '@/assets/page.less'
import '@/assets/form.less'
const { Panel } = Collapse;
const Application = (props: any) => {
  const [data, setData] = useState<any>({})
  const [page, setPage] = useState<any>({})
  const {apiKey, setListenerKey} = props
  useEffect(() => {
    if(setListenerKey){
      setListenerKey("module")
    }
    setPage(Page[apiKey])
    api(apiKey).get(props.data?.id).then((resp:any) => {
      setPage(Page[apiKey])
      setData(resp.result)
    }).catch(err=>{
      console.log(err)
    })
  },[])

  const renderRowCol = (items: MetaFormItem[], index: number) => {
    return (
      <Row key={index}>
        {
          items.map((item: MetaFormItem, idx) => {
            return (
              <Col span={8} style={{ display: "flex" }} key={idx}>
                <div >
                  <MetaLabel {...item} />
                </div>
                <div style={{ paddingTop: "15px" }}>{data[item.apiKey || ""]}</div>
              </Col>
            )
          })
        }
      </Row>
    )
  }
  const renderCollapse = (groups?: MetaGroup[]) => {
    if (page.groups && page.groups.length > 0) {
      return (
        <Collapse defaultActiveKey={["0", "1"]} ghost destroyInactivePanel expandIcon={(props: any) => {
          return (<div className='collapse-icon'><Space /></div>)
        }}>
          {
            page.groups.map((group: MetaGroup, index:number) => {
              const rows: any = []
              if (group.items) {
                while (group.items.length > 0) {
                  rows.push({
                    items: group.items.splice(0, 3)
                  })
                }
              }
              if (group.control) {
                const Component = getComponent({ name: group.control.component, state: {} })
                return <Panel header={group.title} key={index}>
                  {
                    Component ? <React.Suspense fallback={null}>
                      <Component apiKey={group.control.apiKey} data={data.modules}></Component>
                    </React.Suspense> : null
                  }
                </Panel>
              } else {
                return (
                  <Panel header={group.title} key={index}>
                    {
                      rows.map((item: any, idx: number) => {
                        return renderRowCol(item.items, idx)
                      })
                    }
                  </Panel>
                )
              }
            })
          }
        </Collapse>
      )
    }
    return (<div></div>)
  }
  return (<div style={{ width: "100%" }}>
    {renderCollapse(page.groups)}
  </div>)
}

export default Application;